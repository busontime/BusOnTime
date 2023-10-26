import { FormInput } from '@/components/formInput';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Button, Form, Label, ScrollView, SizableText, Spinner, View, XStack } from 'tamagui';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { userService } from '@/services/user';
import { ROLES_ID } from '@/constants/bd';
import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { validateEmail } from '@/utils/validate';
import { useAuthContext } from '@/contexts/auth';

const initForm = {
  birthdate: '',
  email: '',
  lastname: '',
  name: '',
  phone: '',
  cedula: '',
};

export const CreateDriver = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formValues, setFormValues] = useState(initForm);
  const navigation = useNavigation();
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const { createDriver } = useAuthContext();

  const create = async () => {
    if (validateForm()) {
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

    if (email === '') {
      showAlertDialog('El correo esta vacío');
      return false;
    }

    if (!validateEmail(email)) {
      showAlertDialog('El email no es válido');
      return false;
    }

    if (formValues.birthdate === '') {
      showAlertDialog('La fecha esta vacia');
      return false;
    }

    if (formValues.cedula === '') {
      showAlertDialog('La cedula esta vacia');
      return false;
    }

    if (formValues.lastname === '') {
      showAlertDialog('El compo apellidos esta vacio');
      return false;
    }

    if (formValues.name === '') {
      showAlertDialog('El compo nombres esta vacio');
      return false;
    }

    if (formValues.phone === '') {
      showAlertDialog('El compo telefono esta vacio');
      return false;
    }

    if (formValues.cedula.length !== 10) {
      showAlertDialog('La cedula debe contener 10 digitos');
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
              <Label>Cedula:</Label>
              <FormInput
                placeholder='Cedula'
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
                color='black'
                icon={status === 'submitting' ? () => <Spinner /> : undefined}
                onPress={() => {
                  create();
                }}>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  {status === 'submitting' ? 'Guardando...' : 'Guardar'}
                </SizableText>
              </Button>

              <Button
                backgroundColor={status === 'submitting' ? '$gray10' : '$red10'}
                disabled={status === 'submitting'}
                onPress={() => {
                  navigation.goBack();
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
