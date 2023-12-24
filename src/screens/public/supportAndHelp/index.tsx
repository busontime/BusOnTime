import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Label, YStack, TextArea } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { useAuthContext } from '@/contexts/auth';
import { useLoader } from '@/contexts/loader';

import { sendMail } from '@/services/functions';

import { TogleSidebar } from '@/components/togleSidebar';
import { Logo } from '@/components/logo';
import { FormButtons } from '@/components/formButtons';

import { showSuccessToast } from '@/utils/toast';
import { showAlertDialog, showErrorDialog } from '@/utils/dialog';
import { supportEmail } from '@/utils/email';

import { ROLES_ID } from '@/constants/bd';

export const SupportAndHelpScreen = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();
  const { profile } = useAuthContext();
  const { user, person } = profile;

  const [message, setMessage] = useState('');

  const goBack = () => {
    navigation.goBack();
    setMessage('');
  };

  const confirmSendMail = async () => {
    if (message === '') {
      showAlertDialog('El mensaje no puede estar vacío!');
      return;
    }

    showLoader();

    try {
      const userData = {
        name: person.name + ' ' + person.lastname,
        id: user.uid,
        email: person.email,
        role:
          person.roleId === ROLES_ID.passenger
            ? 'Pasajero'
            : person.roleId === ROLES_ID.driver
            ? 'Conductor'
            : 'Administrador',
      };

      const emailData = supportEmail(message, userData);

      const data = await sendMail(emailData);

      if (data.success) {
        showSuccessToast(data.message);
        goBack();
      } else {
        showAlertDialog(data.message);
      }
    } catch (error) {
      showErrorDialog('Error al enviar el correo!');
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

          <YStack f={1} ai='center' jc='center' bg={'$backgroundFocus'} space='$4' p='$6'>
            <Logo />

            <Label size={'$1'} ta='center' fontSize={'$5'}>
              Por favor, comparte tu consulta o inquietud para que podamos brindarte la mejor
              asistencia posible. Estamos aquí para ayudarte.
            </Label>

            <Label size={'$1'} ta='center' fontSize={'$5'}>
              ¡Gracias por preferir Bus On Time!
            </Label>

            <TextArea
              textAlignVertical='top'
              h={'$15'}
              w={'$20'}
              value={message}
              onChangeText={setMessage}
              placeholder='Escriba su mensaje aquí...'
              focusStyle={{
                bw: 2,
                boc: '$blue8',
              }}
            />

            <FormButtons
              firstButtonAction={goBack}
              secondButtonAction={confirmSendMail}
              secondButtonText='Enviar'
              mb='$4'
            />
          </YStack>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
