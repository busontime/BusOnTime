import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { ScrollView, H4 } from 'tamagui';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuthContext } from '@/contexts/auth';

import { userService } from '@/services/user';
import { cooperativeService } from '@/services/cooperative';

import { FormInput } from '@/components/formInput';
import { FormSelect } from '@/components/formSelect';
import { FormButtons } from '@/components/formButtons';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { showSuccessToast } from '@/utils/toast';
import { validateCi, validateEmail } from '@/utils/validate';
import { getDiffYears } from '@/utils/helpers';

import { ROLES_ID } from '@/constants/bd';
import { initDriverForm } from '@/constants/forms';

export const DriverForm = () => {
  const { createDriver } = useAuthContext();
  const navigation = useNavigation();
  const route = useRoute();
  const driver = route.params;

  const [formValues, setFormValues] = useState(null);
  const [cooperatives, setCooperatives] = useState([]);

  const handlerService = async () => {
    if (validateForm()) {
      const email = formValues.email.trim().toLowerCase();

      try {
        if (driver) {
          const data = {
            name: formValues.name,
            lastname: formValues.lastname,
            phone: formValues.phone,
            birthdate: formValues.birthdate,
            ci: formValues.ci,
            cooperativeId: formValues.cooperativeId,
          };

          await userService.updateById(driver.id, data);

          showSuccessToast('Conductor Actualizado!');

          goBack();
        } else {
          const driverRegister = await createDriver(email, formValues.ci);

          if (driverRegister) {
            const { user } = driverRegister;

            const data = {
              name: formValues.name,
              lastname: formValues.lastname,
              email,
              roleId: ROLES_ID.driver,
              phone: formValues.phone,
              birthdate: formValues.birthdate,
              ci: formValues.ci,
              cooperativeId: formValues.cooperativeId,
            };

            await userService.createUser(user.uid, data);

            showSuccessDialog('Conductor creado exitosamente!');
          }
        }
      } catch (error) {
        showErrorDialog('ocurrió un error inténtelo más tarde');
        console.log(error, 'error en el handler service');
      }
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
      showAlertDialog('El email no debe estar vacío');
      return false;
    }

    if (!validateEmail(email)) {
      showAlertDialog('El email no es válido');
      return false;
    }

    if (formValues.phone === '') {
      showAlertDialog('El teléfono no debe estar vacío');
      return false;
    }

    if (getDiffYears(formValues.birthdate) < 18) {
      showAlertDialog('El conductor debe ser mayor de edad');
      return false;
    }

    if (formValues.ci === '') {
      showAlertDialog('La cédula no debe estar vacía');
      return false;
    }

    if (!validateCi(formValues.ci)) {
      showAlertDialog('La cédula debe tener 10 dígitos');
      return false;
    }

    if (!formValues.cooperativeId) {
      showAlertDialog('Debe seleccionar una cooperativa');
      return false;
    }

    return true;
  };

  const goBack = () => {
    navigation.goBack();
  };

  const getCooperatives = async () => {
    try {
      const data = await cooperativeService.getAll();
      setCooperatives(data);
    } catch (error) {
      console.log('Error al recuperar todas las cooperativas', error);
    }
  };

  useEffect(() => {
    getCooperatives();
  }, []);

  useEffect(() => {
    if (driver) {
      setFormValues(driver);
    } else {
      setFormValues(initDriverForm);
    }
  }, [driver]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          bg={'$backgroundFocus'}
          p='$5'
          f={1}
          space='$3'
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <H4 color={'$color'}>{driver ? 'Actualizar Conductor' : 'Nuevo Conductor'}</H4>

          <FormInput
            label='Nombre:'
            placeholder='Escriba el nombre del conductor'
            value={formValues?.name}
            onChangeText={(text) => {
              setFormValues({ ...formValues, name: text });
            }}
          />

          <FormInput
            label='Apellidos:'
            placeholder='Escriba el apellido del conductor'
            value={formValues?.lastname}
            onChangeText={(text) => {
              setFormValues({ ...formValues, lastname: text });
            }}
          />

          {!driver && (
            <FormInput
              label='Email:'
              placeholder='Escriba el email del conductor'
              value={formValues?.email}
              type={'email-address'}
              onChangeText={(text) => {
                setFormValues({ ...formValues, email: text });
              }}
            />
          )}

          <FormInput
            label='Teléfono:'
            placeholder='Escriba el teléfono del conductor'
            type={'numeric'}
            value={formValues?.phone}
            onChangeText={(text) => {
              setFormValues({ ...formValues, phone: text });
            }}
          />

          <FormInput
            isDate
            label='Fecha de nacimiento:'
            placeholder='Seleccione la fecha de nacimiento'
            editable={false}
            dateValue={formValues?.birthdate}
            onChangeText={(value) => {
              setFormValues({ ...formValues, birthdate: value });
            }}
          />

          <FormInput
            label='Cédula:'
            placeholder='Escriba la cédula del conductor'
            type={'numeric'}
            value={formValues?.ci}
            onChangeText={(text) => {
              setFormValues({ ...formValues, ci: text });
            }}
          />

          <FormSelect
            label='Cooperativa:'
            placeholder='Selecciona una cooperativa'
            value={formValues?.cooperativeId}
            options={cooperatives}
            onValueChange={(value) => {
              setFormValues({ ...formValues, cooperativeId: value });
            }}
          />

          <FormButtons
            firstButtonAction={goBack}
            secondButtonText={driver ? 'Actualizar' : 'Crear'}
            secondButtonAction={handlerService}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};