import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Button, Stack, H2, ScrollView, SizableText, XStack, YStack, Label } from 'tamagui';

import { Pen, LogIn } from 'lucide-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAuthContext } from '@/contexts/auth';
import { useThemeContext } from '@/contexts/theme';
import { useLoader } from '@/contexts/loader';

import { userService } from '@/services/user';
import { adminVerification } from '@/services/functions';

import { TogleTheme } from '@/components/togleTheme';
import { Logo } from '@/components/logo';
import { FormInput } from '@/components/formInput';
import { FormButtons } from '@/components/formButtons';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { validateEmail } from '@/utils/validate';
import { showSuccessToast } from '@/utils/toast';

import { COLORS } from '@/constants/styles';
import { ROLES_ID } from '@/constants/bd';
import { loginForm } from '@/constants/forms';

export const LoginScreen = () => {
  const navigation = useNavigation();

  const { isDark } = useThemeContext();
  const { loginWithGoogle, login, sendPasswordResetEmail, updateProfile } = useAuthContext();
  const { showLoader, hideLoader } = useLoader();

  const [formValues, setFormValues] = useState(loginForm);
  const [showForgotPassWordInput, setShowForgotPassWordInput] = useState(false);

  const handlerLogin = async () => {
    if (validateForm()) {
      showLoader();

      const email = formValues.email.trim().toLowerCase();

      try {
        const result = await login(email, formValues.password);

        if (result) {
          showSuccessToast('Inicio de Sesión Exitoso!');

          try {
            const data = await adminVerification(email);

            if (data.admin && data.success) {
              showSuccessDialog(data.message);
              await updateProfile();
            }

            if (data.admin && !data.success) {
              showErrorDialog(data.message);
            }
          } catch (error) {
            console.log('error al enviar el codigo de verificacion', error);
          }
        }
      } catch (error) {
        console.log('error', error);
        showErrorDialog(error?.message ?? 'Ocurrió un problema!');
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
      showErrorDialog(error?.message ?? 'Ocurrió un problema!');
    } finally {
      hideLoader();
    }
  };

  const validateEmailToReset = () => {
    const email = formValues.email.trim().toLowerCase();

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
        const email = formValues.email.trim().toLowerCase();

        const data = await sendPasswordResetEmail(email);

        if (data) {
          showSuccessDialog(
            'Correo electrónico enviado!, por favor revisar su bandeja de entrada o spam'
          );
          setShowForgotPassWordInput(false);
        }
      } catch (error) {
        showAlertDialog('Ocurrió un error al enviar el correo electrónico de cambio de contraseña');
      } finally {
        hideLoader();
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

          <H2 mt='$15'>{showForgotPassWordInput ? 'Cambia tu contraseña' : 'Inicia Sesión'}</H2>

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
            <YStack space='$2.5' alignItems='center'>
              <Label w={'$20'} textAlign='center'>
                Escriba su correo electrónico para poder enviar un link, donde podrá cambiar su
                contraseña
              </Label>

              <FormInput
                label='Correo electrónico:'
                placeholder='Escribe tu correo electrónico'
                type={'email-address'}
                value={formValues.email}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, email: text });
                }}
              />

              <FormButtons
                firstButtonAction={() => {
                  setShowForgotPassWordInput(false);
                }}
                secondButtonText={'Enviar'}
                secondButtonAction={sendResetPasswordEmail}
              />
            </YStack>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
