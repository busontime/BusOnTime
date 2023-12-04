import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Label, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { useAuthContext } from '@/contexts/auth';
import { useLoader } from '@/contexts/loader';

import { TogleSidebar } from '@/components/togleSidebar';
import { Logo } from '@/components/logo';
import { FormButtons } from '@/components/formButtons';
import { FormInput } from '@/components/formInput';

import { showSuccessToast } from '@/utils/toast';
import { showAlertDialog } from '@/utils/dialog';
import { validatePassword } from '@/utils/validate';

export const EditPasswordScreen = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();
  const { updatePassword } = useAuthContext();

  const [password, setPassword] = useState('');

  const goToProfileScreen = () => {
    navigation.goBack();
    setPassword('');
  };

  const changePassword = async () => {
    if (password === '') {
      showAlertDialog('Porfavor ingrese una contraseña');
      return;
    }

    if (!validatePassword(password)) {
      showAlertDialog('Porfavor ingrese una contraseña segura');
      return;
    }

    showLoader();

    try {
      const res = await updatePassword(password);

      if (res) {
        showSuccessToast('Contraseña actualizada!');
        goToProfileScreen();
      }
    } catch (error) {
      showAlertDialog('Error al actualizar la contraseña');
    } finally {
      hideLoader();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack f={1}>
          <TogleSidebar />

          <YStack f={1} bg={'$backgroundFocus'} ai='center' jc='center' space='$4' p='$6'>
            <Logo />

            <Label size={'$1'} ta='center' fontSize={'$5'}>
              Aquí puedes cambiar tu contraseña siempre y cuando está cumpla con las características
              de una contraseña segura.
            </Label>

            <Label size={'$1'} ta='center' fontSize={'$5'}>
              La contraseña se considera segura si tiene mas de 6 carácteres, tiene un número, una
              letra mayúscula y un símbolo.
            </Label>

            <FormInput
              isSecure
              label='Contraseña'
              placeholder='Escriba su nueva contraseña'
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />

            <FormButtons
              firstButtonAction={goToProfileScreen}
              secondButtonAction={changePassword}
              secondButtonText='Actualizar'
              firstButtonText='Cancelar'
            />
          </YStack>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
