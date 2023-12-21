import React, { useState } from 'react';
import { Button, YStack, H3, Text } from 'tamagui';

import { LogOut, ShieldCheck } from 'lucide-react-native';

import { useLoader } from '@/contexts/loader';
import { useAuthContext } from '@/contexts/auth';

import { userService } from '@/services/user';

import { FormInput } from '@/components/formInput';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';

export const AdminVerificationScreen = () => {
  const { showLoader, hideLoader } = useLoader();
  const { profile, logout, updateProfile } = useAuthContext();
  const { person, user } = profile;

  const [code, setCode] = useState('');

  const verifyCode = async () => {
    if (code === '') {
      showAlertDialog('Escriba el código de verificación');
      return;
    }

    if (Number(code) !== person.code) {
      showErrorDialog('Código Incorrecto!');
      return;
    }

    showLoader();

    try {
      await userService.updateById(user?.uid, { verified: true });

      await updateProfile();

      showSuccessDialog('Verificación Exitosa!');
    } catch (error) {
      showAlertDialog('Ocurrió un error, intente nuevamente!');
    } finally {
      hideLoader();
    }
  };

  return (
    <YStack bg={'$backgroundFocus'} f={1} jc='center' ai='center' space='$5'>
      <H3 ta='center' color={'$color'}>
        Bienvenido {person?.name} {person?.lastname}
      </H3>

      <Text color={'$color'} ta='center' paddingHorizontal='$6'>
        Escribe el código de verificación que te llego a tu email cuando iniciaste sesión
      </Text>

      <FormInput
        label='Código de Verificación:'
        placeholder='Escriba el Código de Verificación'
        type={'numeric'}
        value={code}
        onChangeText={setCode}
      />

      <Button
        w={'$20'}
        size={'$5'}
        icon={<ShieldCheck size={40} />}
        variant='outlined'
        backgroundColor='$blue8'
        onPress={verifyCode}>
        Verificar Código
      </Button>

      <Button
        w={'$20'}
        size={'$5'}
        icon={<LogOut size={40} />}
        variant='outlined'
        backgroundColor='$red8'
        onPress={logout}>
        Cerrar Sesión
      </Button>
    </YStack>
  );
};
