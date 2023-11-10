import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Button, Form, Label, ScrollView, SizableText, Spinner, View, XStack, H4 } from 'tamagui';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { useAuthContext } from '@/contexts/auth';

import { userService } from '@/services/user';

import { FormInput } from '@/components/formInput';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { validateEmail } from '@/utils/validate';

import { ROLES_ID } from '@/constants/bd';

const initForm = {
  birthdate: '',
  email: '',
  lastname: '',
  name: '',
  phone: '',
  cedula: '',
};

export const CreateDriver = () => {
  const { createDriver } = useAuthContext();
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formValues, setFormValues] = useState(initForm);
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');

  const create = async () => {
    if (validateForm()) {
      setStatus('submitting');
      const email = formValues.email.trim().toLowerCase();
      try {
        const driverRegister = await createDriver(email, formValues.cedula);

        if (driverRegister) {
          const { user } = driverRegister;
          const data = {
            name: formValues.name,
            lastname: formValues.lastname,
            email,
            roleId: ROLES_ID.driver,
            phone: formValues.phone,
            birthdate: formValues.birthdate,
            cedula: formValues.cedula,
          };
          await userService.createUser(user.uid, data);

          showSuccessDialog('Conductor Creado');
        }
      } catch (error) {
        console.log(error, 'no se pudo crear el conductor');
        showErrorDialog(error?.message ?? 'Ocurrio un problema!');
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
      setFormValues({ ...formValues, birthdate: formattedDate });
    }
  };

  const validateForm = () => {
    const email = formValues.email.trim().toLowerCase();

    if (formValues.name === '') {
      showAlertDialog('El nombre no debe estar vacío');
      return false;
    }

    if (formValues.lastname === '') {
      showAlertDialog('El apellido no debe estar vacío');
      return false;
    }

    if (email === '') {
      showAlertDialog('El correo esta vacío');
      return false;
    }

    if (!validateEmail(email)) {
      showAlertDialog('El email no es válido');
      return false;
    }

    if (formValues.phone === '') {
      showAlertDialog('El telefono no debe estar vacío');
      return false;
    }

    if (formValues.birthdate === '') {
      showAlertDialog('La fecha de nacimiento no debe estar vacía');
      return false;
    }

    const birthDate = moment(formValues.birthdate, 'DD/MM/YYYY');
    const age = moment().diff(birthDate, 'years');

    if (age < 18) {
      showAlertDialog('El conductor debe ser mayor de edad');
      return false;
    }

    if (formValues.cedula === '') {
      showAlertDialog('La cédula no debe estar vacía');
      return false;
    }

    if (formValues.cedula.length !== 10) {
      showAlertDialog('La cédula debe tener 10 dígitos');
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
            <H4 color={'$color'}>Nuevo Conductor</H4>

            <View>
              <Label>Nombres:</Label>
              <FormInput
                placeholder='Nombre'
                value={formValues.name}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, name: text });
                }}
              />
            </View>

            <View>
              <Label>Apellidos:</Label>
              <FormInput
                placeholder='Apellidos'
                value={formValues.lastname}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, lastname: text });
                }}
              />
            </View>

            <View>
              <Label>Correo:</Label>
              <FormInput
                placeholder='Correo'
                value={formValues.email}
                type={'email-address'}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, email: text });
                }}
              />
            </View>

            <View>
              <Label>Telefono:</Label>
              <FormInput
                placeholder='Telefono'
                type={'numeric'}
                value={formValues.phone}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, phone: text });
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
                    value={formValues.birthdate}
                    onChangeText={(text) => {
                      setFormValues({ ...formValues, birthdate: text });
                    }}
                  />
                </TouchableOpacity>
              </View>
              {showPicker && (
                <DateTimePicker value={date} mode='date' display='calendar' onChange={onChange} />
              )}
            </View>

            <View>
              <Label>Cédula:</Label>
              <FormInput
                placeholder='Cédula'
                type={'numeric'}
                value={formValues.cedula}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, cedula: text });
                }}
              />
            </View>

            <XStack gap='$5'>
              <Button
                size='$3'
                backgroundColor='$green8'
                icon={status === 'submitting' ? () => <Spinner /> : undefined}
                onPress={async () => {
                  await create();
                }}>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  {status === 'submitting' ? 'Creando...' : 'Crear'}
                </SizableText>
              </Button>

              <Button
                backgroundColor={status === 'submitting' ? '$gray10' : '$red9'}
                disabled={status === 'submitting'}
                onPress={() => {
                  navigation.goBack();
                }}
                size='$3'>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  Cancelar
                </SizableText>
              </Button>
            </XStack>
          </Form>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
