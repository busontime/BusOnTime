import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Button, Stack, H2, ScrollView, SizableText, XStack, YStack, Label } from 'tamagui';

import { Pen, LogIn } from 'lucide-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { userService } from '@/services/user';

import { TogleTheme } from '@/components/togleTheme';
import { Logo } from '@/components/logo';
import { FormInput } from '@/components/formInput';

import { useAuthContext } from '@/contexts/auth';
import { useThemeContext } from '@/contexts/theme';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { validateEmail } from '@/utils/validate';

import { COLORS } from '@/constants/styles';
import { ROLES_ID } from '@/constants/bd';
import { useLoader } from '@/contexts/loading';

const initForm = {
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { showLoader, hiddenLoader } = useLoader();

  const { isDark } = useThemeContext();
  const { loginWithGoogle, login, resetPassword } = useAuthContext();

  const [formValues, setFormValues] = useState(initForm);
  const [formValue, setFormValue] = useState({});
  const [showForgotPassWordInput, setShowForgotPassWordInput] = useState(false);

  const handlerLogin = async () => {
    if (validateForm()) {
      showLoader();
      const email = formValues.email.trim().toLowerCase();

      try {
        await login(email, formValues.password);
      } catch (error) {
        console.log('error', error);
        showErrorDialog(error?.message ?? 'Ocurrio un problema!');
      } finally {
        hiddenLoader();
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

    if (formValues.password === '') {
      showAlertDialog('Llene la contraseña');
      return false;
    }

    if (formValues.password.length < 6) {
      showAlertDialog('La contraseña debe ser de mas de 6 carácteres');
      return false;
    }

    return true;
  };

  const goToRegisterScreen = () => {
    navigation.navigate('register' as never);
  };

  const loginGoogle = async () => {
    showLoader();
    try {
      const res = await loginWithGoogle();

      const { additionalUserInfo, user } = res;

      if (additionalUserInfo.isNewUser) {
        const data = {
          name: additionalUserInfo.profile.given_name,
          lastname: additionalUserInfo.profile.family_name,
          email: user.email,
          roleId: ROLES_ID.passenger,
          phone: '',
          birthdate: null,
        };

        await userService.createUser(user.uid, data);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      hiddenLoader();
    }
  };

  const validateEmailToReset = () => {
    const email = formValue.email.trim().toLowerCase();
    if (email === '') {
      showAlertDialog('Debe escribir su email');
      return false;
    }

    if (!validateEmail(email)) {
      showAlertDialog('El email no es válido');
      return false;
    }

    return true;
  };

  const sendResetPasswordEmail = async () => {
    if (validateEmailToReset()) {
      showLoader();
      try {
        const email = formValue.email.trim().toLowerCase();
        const data = await resetPassword(email);
        if (data === true) {
          showSuccessDialog('Correo enviado, por favor revisar su bandeja de entrada o spam');
          setFormValue({});
          setShowForgotPassWordInput(!showForgotPassWordInput);
          return;
        }
      } catch (error) {
        showAlertDialog('Error al enviar la contraseña a su correo');
      } finally {
        hiddenLoader();
      }
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
          f={1}
          space='$3'
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Stack pos='absolute' right={10} top={10}>
            <TogleTheme />
          </Stack>

          <H2 mt='$15'>Inicia Sesión</H2>

          <Logo />

          {!showForgotPassWordInput && (
            <YStack space='$3' alignItems='center'>
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

              <XStack space='$5'>
                <Button
                  w='$11'
                  iconAfter={<LogIn />}
                  backgroundColor='$blue8'
                  size='$4'
                  onPress={handlerLogin}>
                  Login
                </Button>

                <Button
                  w='$11'
                  iconAfter={<Pen />}
                  backgroundColor='$blue3'
                  borderColor={'$blue8'}
                  borderWidth={'$1'}
                  size='$4'
                  onPress={goToRegisterScreen}>
                  Registro
                </Button>
              </XStack>

              <Button
                iconAfter={
                  <Ionicons
                    name='logo-google'
                    size={25}
                    color={isDark ? COLORS.light : COLORS.dark}
                  />
                }
                backgroundColor='$green8'
                size='$4'
                w='$20'
                onPress={loginGoogle}>
                Inicia Sesión con Google
              </Button>

              <SizableText
                color={'$color'}
                onPress={() => {
                  setShowForgotPassWordInput(true);
                }}
                mb='$5'>
                Olvidaste tu contraseña?
              </SizableText>
            </YStack>
          )}

          {showForgotPassWordInput && (
            <YStack space='$3' mb='$3' alignItems='center'>
              <Label w={'$20'} textAlign='center'>
                Escriba su correo electrónico para enviar un link, donde podrá cambiar su contraseña
              </Label>
              <FormInput
                label='Correo electrónico:'
                placeholder='Escribe tu correo electrónico'
                type={'email-address'}
                value={formValue.email}
                onChangeText={(text) => {
                  setFormValue({ ...formValue, email: text });
                }}
              />
              <XStack space='$4' justifyContent='center'>
                <Button
                  backgroundColor='$blue8'
                  size='$4'
                  w='$11'
                  onPress={() => {
                    sendResetPasswordEmail();
                  }}>
                  Restaurar
                </Button>
                <Button
                  backgroundColor='$red8'
                  size='$4'
                  w='$11'
                  onPress={() => {
                    setShowForgotPassWordInput(false);
                  }}>
                  Cerrar
                </Button>
              </XStack>
            </YStack>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
