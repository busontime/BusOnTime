import React, { useState, useEffect } from 'react';
import { H4, ScrollView, YStack } from 'tamagui';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuthContext } from '@/contexts/auth';
import { useLoader } from '@/contexts/loader';

import { userService } from '@/services/user';
import { uploadImage } from '@/services/storage';

import { TogleSidebar } from '@/components/togleSidebar';
import { ImagePickerDialog } from '@/components/imagePickerDialog';
import { FormInput } from '@/components/formInput';
import { FormButtons } from '@/components/formButtons';

import { showAlertDialog } from '@/utils/dialog';
import { showSuccessToast } from '@/utils/toast';
import { validateCi, validateEmail } from '@/utils/validate';
import { convertFirestoreDateToDate, getDiffYears } from '@/utils/helpers';

import { ROLES_ID } from '@/constants/bd';

export const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();
  const { profile, updateProfile, updateEmail } = useAuthContext();
  const { person, user } = profile;

  const [updateForm, setUpdateForm] = useState(null);

  const update = async () => {
    if (validateForm()) {
      showLoader();

      try {
        let photoUri = updateForm?.photo;

        if (photoUri && photoUri !== '' && !photoUri.includes('firebasestorage')) {
          try {
            photoUri = await uploadImage(photoUri, user?.uid + '/' + 'profile.png');
          } catch (error) {
            showAlertDialog('Error al subir la imagen');
          }
        }

        const data = {
          birthdate: updateForm.birthdate,
          email: updateForm?.email.trim().toLowerCase(),
          lastname: updateForm?.lastname,
          name: updateForm?.name,
          phone: updateForm?.phone,
          ci: updateForm?.ci,
          photo: photoUri,
        };

        if (!updateForm?.ci) {
          delete data.ci;
        }

        if (data.email !== person?.email) {
          const res = await updateEmail(data.email);
          if (!res) {
            return;
          }
        }

        await userService.updateById(user?.uid, data);

        await updateProfile();

        showSuccessToast('Perfil Actualizado!');

        goBack();
      } catch (error) {
        console.log('error al  actualizar', error);
        showAlertDialog('Error al actualizar, Inténtelo más tarde');
      } finally {
        hideLoader();
      }
    }
  };

  const validateForm = () => {
    if (person.roleId === ROLES_ID.driver) {
      if (updateForm.name === '') {
        showAlertDialog('El nombre no debe estar vacío');
        return false;
      }

      if (updateForm.lastname === '') {
        showAlertDialog('El apellido no debe estar vacío');
        return false;
      }

      if (updateForm.phone === '') {
        showAlertDialog('El teléfono no debe estar vacío');
        return false;
      }

      if (updateForm.ci === '') {
        showAlertDialog('La cédula no debe estar vacía');
        return false;
      }

      if (!validateCi(updateForm?.ci)) {
        showAlertDialog('La cédula debe tener 10 dígitos');
        return false;
      }

      if (getDiffYears(updateForm.birthdate) < 18) {
        showAlertDialog('Debes ser mayor de edad');
        return false;
      }
    }

    const email = updateForm?.email.trim().toLowerCase();

    if (email === '') {
      showAlertDialog('El email no debe estar vacío');
      return false;
    }

    if (!validateEmail(email)) {
      showAlertDialog('El email no es válido');
      return false;
    }

    if (getDiffYears(updateForm.birthdate) < 6) {
      showAlertDialog('Debes tener al menos 6 años');
      return false;
    }

    return true;
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setUpdateForm({
      ...person,
      birthdate: convertFirestoreDateToDate(person?.birthdate),
      photo: person?.photo ? person.photo : null,
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack f={1}>
          <TogleSidebar />

          <ScrollView
            bg={'$backgroundFocus'}
            showsVerticalScrollIndicator={false}
            f={1}
            p='$6'
            space='$3'
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <H4 color={'$color'}>Edición de Perfil</H4>

            <ImagePickerDialog
              picture={updateForm?.photo}
              changePicture={(picture) => {
                if (picture) {
                  setUpdateForm({ ...updateForm, photo: picture.uri });
                }
              }}
            />

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
              type={'email-address'}
              placeholder='Escriba su email'
              value={updateForm?.email}
              onChangeText={(text) => {
                setUpdateForm({ ...updateForm, email: text });
              }}
            />

            <FormInput
              label='Teléfono:'
              placeholder='Escriba su teléfono'
              type={'numeric'}
              value={updateForm?.phone}
              onChangeText={(text) => {
                setUpdateForm({ ...updateForm, phone: text });
              }}
            />

            <FormInput
              isDate
              label='Fecha de nacimiento:'
              placeholder='Seleccione una fecha'
              editable={false}
              dateValue={updateForm?.birthdate}
              onChangeText={(val) => {
                setUpdateForm({ ...updateForm, birthdate: val });
              }}
            />

            {person?.ci && (
              <FormInput
                label='Cédula:'
                placeholder='Escriba su cédula'
                type={'numeric'}
                value={updateForm?.ci}
                onChangeText={(text) => {
                  setUpdateForm({ ...updateForm, ci: text });
                }}
              />
            )}

            <FormButtons
              firstButtonAction={goBack}
              secondButtonText='Actualizar'
              secondButtonAction={update}
            />
          </ScrollView>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
