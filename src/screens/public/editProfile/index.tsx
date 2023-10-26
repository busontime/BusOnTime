import React, { useState, useEffect } from 'react';
import { Button, Form, Label, ScrollView, SizableText, Spinner, XStack } from 'tamagui';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '@/contexts/auth';
import { UserCircle2 } from 'lucide-react-native';
import { COLORS } from '@/constants/styles';
import { useThemeContext } from '@/contexts/theme';
import { FormInput } from '@/components/formInput';
import { userService } from '@/services/user';
import { showAlertDialog } from '@/utils/dialog';
import { validateEmail } from '@/utils/validate';
import moment from 'moment';

const initForm = {
  birthdate: '',
  email: '',
  lastname: '',
  name: '',
  phone: '',
  cedula: '',
};

export const EditProfile = () => {
  const { profile, updateProfile, updateEmail } = useAuthContext();
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const [updateForm, setUpdateForm] = useState({ ...initForm, ...profile.person });
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { isDark } = useThemeContext();
  const navigation = useNavigation();

  useEffect(() => {
    setUpdateForm({
      ...updateForm,
      ...profile.person,
    });
  }, [profile.person]);

  const update = async () => {
    if (validateForm()) {
      setStatus('submitting');
      try {
        const data = {
          birthdate: updateForm.birthdate,
          email: updateForm.email,
          lastname: updateForm.lastname,
          name: updateForm.name,
          phone: updateForm.phone,
          cedula: updateForm.cedula,
        };

        if (!profile?.person?.cedula) {
          delete data.cedula;
        }
        if (updateForm.email !== profile.person.email) {
          const updateEmailUser = await updateEmail(updateForm.email);
          if (!updateEmailUser) {
            return;
          }
        }
        await userService.updateById(profile.user.uid, data);
        updateProfile(data);
      } catch (error) {
        console.log('error al  actualizar', error);
        showAlertDialog('Error al actualizar, Intentelo mas tarde');
      } finally {
        setStatus('submitted');
      }
    }
  };

  const onChange = (value, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      const formattedDate = currentDate.toLocaleDateString('es-ES');
      setUpdateForm({ ...updateForm, birthdate: formattedDate });
    }
  };

  const validateForm = () => {
    const email = updateForm.email.trim().toLowerCase();
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

    if (updateForm.birthdate === '') {
      showAlertDialog('La fecha de nacimiento esta vacia');
      return false;
    }

    if (updateForm.cedula.length !== 10 && profile?.person?.cedula) {
      showAlertDialog('La cedula debe contener 10 digitos');
      return false;
    }

    if (updateForm.cedula === '' && profile?.person?.cedula) {
      showAlertDialog('La cedula esta vacia');
      return false;
    }

    const birthDate = moment(updateForm.birthdate, 'DD/MM/YYYY');
    const age = moment().diff(birthDate, 'years');

    if (age < 18) {
      showAlertDialog('Debes ser mayor de edad');
      return false;
    }

    return true;
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
          f={1}
          space='$3'
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Form
            alignItems='center'
            height='100%'
            width='100%'
            gap='$3'
            onSubmit={() => {
              setStatus('submitting');
            }}
            padding='$8'>
            <UserCircle2 color={isDark ? COLORS.light : COLORS.dark} size={70} />

            <View>
              <Label margin='$1'>Nombres:</Label>
              <FormInput
                placeholder='Nombre'
                value={updateForm.name}
                onChangeText={(text) => {
                  setUpdateForm({ ...updateForm, name: text });
                }}
              />
            </View>

            <View>
              <Label margin='$1'>Apellidos:</Label>
              <FormInput
                placeholder='Apellido'
                value={updateForm.lastname}
                onChangeText={(text) => {
                  setUpdateForm({ ...updateForm, lastname: text });
                }}
              />
            </View>

            <View>
              <Label margin='$1'>Email:</Label>
              <FormInput
                placeholder='Email'
                value={updateForm.email}
                onChangeText={(text) => {
                  setUpdateForm({ ...updateForm, email: text });
                }}
              />
            </View>

            <View>
              <Label margin='$1'>Telefono:</Label>
              <FormInput
                placeholder='Telefono'
                value={updateForm.phone}
                onChangeText={(text) => {
                  setUpdateForm({ ...updateForm, phone: text });
                }}
              />
            </View>

            <View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setShowPicker(!showPicker);
                  }}>
                  <Label margin='$1'>Fecha de nacimiento:</Label>
                  <FormInput
                    editable={false}
                    placeholder='Seleccione una fecha'
                    onChangeText={(text) => {
                      setUpdateForm({ ...updateForm, birthdate: text });
                    }}
                    value={updateForm.birthdate}
                  />
                </TouchableOpacity>
              </View>
              {showPicker && (
                <DateTimePicker value={date} mode='date' display='calendar' onChange={onChange} />
              )}
            </View>

            {profile?.person?.cedula && (
              <View>
                <Label margin='$1'>Cédula:</Label>
                <FormInput
                  onChangeText={(text) => {
                    setUpdateForm({ ...updateForm, cedula: text });
                  }}
                  placeholder='Cedula'
                  value={updateForm.cedula}
                />
              </View>
            )}

            <XStack gap='$5'>
              <Button
                size='$3'
                backgroundColor='$green8'
                color='black'
                icon={status === 'submitting' ? () => <Spinner /> : undefined}
                onPress={() => {
                  update();
                }}>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  {status === 'submitting' ? 'Guardando...' : 'Guardar'}
                </SizableText>
              </Button>

              <Button
                backgroundColor={status === 'submitting' ? '$gray10' : '$red10'}
                disabled={status === 'submitting'}
                onPress={() => {
                  navigation.navigate('profile' as never);
                }}
                size='$3'>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  Regresar
                </SizableText>
              </Button>
            </XStack>
          </Form>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
