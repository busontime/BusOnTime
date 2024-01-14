import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Button, Stack, H2, ScrollView } from 'tamagui';

import { Pen, LogIn } from 'lucide-react-native';

import { useAuthContext } from '@/contexts/auth';
import { useLoader } from '@/contexts/loader';

import { userService } from '@/services/user';

import { TogleTheme } from '@/components/togleTheme';
import { Logo } from '@/components/logo';
import { FormInput } from '@/components/formInput';

import { showAlertDialog, showErrorDialog } from '@/utils/dialog';
import { validateEmail } from '@/utils/validate';
import { showSuccessToast } from '@/utils/toast';

import { ROLES_ID } from '@/constants/bd';
import { registerForm } from '@/constants/forms';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();
  const { createAccount } = useAuthContext();

  const [formValues, setFormValues] = useState(registerForm);

  const register = async () => {
    if (validateForm()) {
      showLoader();

      const email = formValues.email.trim().toLowerCase();

      try {
        const userRegister = await createAccount(email, formValues.password);

        if (userRegister) {
          const { user } = userRegister;

          const data = {
            name: '',
            lastname: '',
            email,
            roleId: ROLES_ID.passenger,
            phone: '',
            birthdate: null,
          };

          await userService.createUser(user.uid, data);

          goToLoginScreen();

          showSuccessToast('Registro Exitoso!');
        }
      } catch (error) {
        console.log('error', error);
        showErrorDialog(error?.message ?? 'Ocurrio un problema!');
      } finally {
        hideLoader();
      }
    }
  };

  const validateForm = () => {
    const email = formValues.email.trim().toLowerCase();

    if (email === '') {
      showAlertDialog('El email esta vacío');
      return false;
    }

    if (!validateEmail(email)) {
      showAlertDialog('El email no es válido');
      return false;
    }

    if (formValues.password === '' || formValues.confirmPassword === '') {
      showAlertDialog('Llene la contraseña');
      return false;
    }

    if (formValues.password.length < 6 || formValues.confirmPassword.length < 6) {
      showAlertDialog('La contraseña debe ser de mas de 6 carácteres');
      return false;
    }

    if (formValues.password !== formValues.confirmPassword) {
      showAlertDialog('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const goToLoginScreen = () => {
    navigation.navigate('login' as never);
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
          <Stack pos='absolute' right={10} top={10}>
            <TogleTheme />
          </Stack>

          <H2 mt='$15'>Registrate!</H2>

          <Logo />

          <FormInput
            placeholder='Correo electrónico'
            type={'email-address'}
            value={formValues.email}
            onChangeText={(text) => {
              setFormValues({ ...formValues, email: text });
            }}
          />

          <FormInput
            placeholder='Contraseña'
            isSecure
            value={formValues.password}
            onChangeText={(text) => {
              setFormValues({ ...formValues, password: text });
            }}
          />

          <FormInput
            placeholder='Confirma la Contraseña'
            isSecure
            value={formValues.confirmPassword}
            onChangeText={(text) => {
              setFormValues({ ...formValues, confirmPassword: text });
            }}
          />

          <Button w='$12' iconAfter={<Pen />} backgroundColor='$blue8' size='$4' onPress={register}>
            Registrar
          </Button>

          <Button
            w='$12'
            mb='$5'
            iconAfter={<LogIn />}
            backgroundColor='$blue3'
            borderColor={'$blue8'}
            borderWidth={'$1'}
            size='$4'
            onPress={goToLoginScreen}>
            Inicia Sesión
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
