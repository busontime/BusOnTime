import React, { useState, useEffect } from 'react';
import { H4, Image, ScrollView, View } from 'tamagui';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera } from 'lucide-react-native';

import moment from 'moment';

import { useAuthContext } from '@/contexts/auth';
import { useThemeContext } from '@/contexts/theme';

import { FormInput } from '@/components/formInput';
import { FormButtons } from '@/components/formButtons';

import { userService } from '@/services/user';

import { showAlertDialog } from '@/utils/dialog';
import { validateCi, validateEmail } from '@/utils/validate';
import { showSuccessToast } from '@/utils/toast';

import { COLORS } from '@/constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { pickerImage } from '@/utils/helpers';
import { uploadImage } from '@/services/storage';

export const EditProfile = () => {
  const { profile, updateProfile, updateEmail } = useAuthContext();
  const [updateForm, setUpdateForm] = useState(null);
  const { isDark } = useThemeContext();
  const navigation = useNavigation();
  const route = useRoute();
  const formattedProfile = route.params;

  useEffect(() => {
    if (formattedProfile) {
      setUpdateForm(formattedProfile);
    }
  }, [formattedProfile]);

  const update = async () => {
    if (validateForm()) {
      try {
        let photoUri = null;
        if (updateForm?.photo && updateForm?.photo !== '') {
          try {
            photoUri = await uploadImage(
              updateForm?.photo,
              profile?.user?.uid + '/' + 'profile.png'
            );
          } catch (error) {
            showAlertDialog('Error al subir la imagen');
          }
        }

        const data = {
          birthdate: updateForm?.birthdate,
          email: updateForm?.email,
          lastname: updateForm?.lastname,
          name: updateForm?.name,
          phone: updateForm?.phone,
          ci: updateForm?.ci,
          photo: photoUri,
        };

        if (!updateForm?.ci) {
          delete data.ci;
        }
        if (updateForm?.email !== profile?.person?.email) {
          const updateEmailUser = await updateEmail(updateForm?.email);
          if (!updateEmailUser) {
            return;
          }
        }
        await userService.updateById(profile?.user?.uid, data);
        updateProfile(data);
        showSuccessToast('Perfil Actualizado!');
        navigation.goBack();
      } catch (error) {
        console.log('error al  actualizar', error);
        showAlertDialog('Error al actualizar, Intentelo mas tarde');
      }
    }
  };

  const validateForm = () => {
    const email = updateForm?.email.trim().toLowerCase();
    if (email === '') {
      showAlertDialog('El email esta vacio');
      return false;
    }

    if (!validateEmail(email)) {
      showAlertDialog('el email no es valido');
      return false;
    }

    if (updateForm.name === '') {
      showAlertDialog('El nombre esta vacio');
      return false;
    }

    if (updateForm.lastname === '') {
      showAlertDialog('El apellido esta vacio');
      return false;
    }

    if (updateForm.phone === '') {
      showAlertDialog('El telefono esta vacio');
      return false;
    }

    if (updateForm?.ci && updateForm.ci === '') {
      showAlertDialog('La cedula esta vacia');
      return false;
    }

    if (updateForm?.ci && !validateCi(updateForm?.ci)) {
      showAlertDialog('La cedula debe contener 10 digitos');
      return false;
    }

    const birthDate = moment(updateForm.birthdate);
    const age = moment().diff(birthDate, 'years');

    if (age < 18) {
      showAlertDialog('Debes ser mayor de edad');
      return false;
    }

    return true;
  };

  const goBack = () => {
    navigation.goBack();
  };

  const selectImage = async () => {
    try {
      const result = await pickerImage();
      if (!result) {
        setUpdateForm({ ...updateForm, photo: '' });
      } else {
        setUpdateForm({ ...updateForm, photo: result.uri });
      }
    } catch (error) {
      showAlertDialog('No se pudo seleccionar la imagen');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          bg={'$backgroundFocus'}
          showsVerticalScrollIndicator={false}
          f={1}
          p='$3'
          space='$3'
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <H4 color={'$color'}>Actualizar perfil</H4>
          <View>
            <TouchableOpacity
              onPress={() => {
                selectImage();
              }}>
              {updateForm?.photo ? (
                <Image
                  source={{ uri: updateForm?.photo }}
                  style={{ height: 100, width: 100, borderRadius: 50 }}
                />
              ) : (
                <Camera color={isDark ? COLORS.light : COLORS.dark} size={70} />
              )}
            </TouchableOpacity>
          </View>

          <FormInput
            label='Nombres:'
            placeholder='Escriba sus nombres'
            value={updateForm?.name}
            onChangeText={(text) => {
              setUpdateForm({ ...updateForm, name: text });
            }}
          />

          <FormInput
            label='Apellidos:'
            placeholder='Escriba sus apellidos'
            value={updateForm?.lastname}
            onChangeText={(text) => {
              setUpdateForm({ ...updateForm, lastname: text });
            }}
          />

          <FormInput
            label='Email:'
            placeholder='Escriba su email'
            value={updateForm?.email}
            onChangeText={(text) => {
              setUpdateForm({ ...updateForm, email: text });
            }}
          />

          <FormInput
            label='Telefono:'
            placeholder='Escriba su telefono'
            type={'numeric'}
            value={updateForm?.phone}
            onChangeText={(text) => {
              setUpdateForm({ ...updateForm, phone: text });
            }}
          />

          <FormInput
            isDate
            label='Fecha de nacimiento:'
            editable={false}
            placeholder='Seleccione una fecha'
            dateValue={updateForm?.birthdate}
            onChangeText={(text) => {
              setUpdateForm({ ...updateForm, birthdate: text });
            }}
          />

          {updateForm?.ci && (
            <FormInput
              label='Cédula:'
              type={'numeric'}
              onChangeText={(text) => {
                setUpdateForm({ ...updateForm, ci: text });
              }}
              placeholder='Escriba su cédula'
              value={updateForm?.ci}
            />
          )}

          <FormButtons
            firstButtonAction={goBack}
            secondButtonText='Guardar'
            secondButtonAction={update}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
