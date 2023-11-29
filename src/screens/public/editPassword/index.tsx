import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Label, ScrollView } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { FormButtons } from '@/components/formButtons';
import { FormInput } from '@/components/formInput';
import { Logo } from '@/components/logo';

import { useAuthContext } from '@/contexts/auth';
import { showSuccessToast } from '@/utils/toast';
import { showAlertDialog } from '@/utils/dialog';
import { validatePassword } from '@/utils/validate';

export const EditPassword = () => {
  const [updateForm, setupdateForm] = useState({});
  const navigation = useNavigation();
  const { updatePassword } = useAuthContext();

  const goToProfile = () => {
    navigation.goBack();
  };

  const newPassword = async () => {
    try {
      const { password } = updateForm;

      if (!password) {
        showAlertDialog('Porfavor ingrese una contraseña');
        return;
      }

      const securePassword = validatePassword(password);

      if (!securePassword) {
        showAlertDialog('Porfavor ingrese una contraseña segura');
        return;
      }

      await updatePassword(updateForm.password);
      showSuccessToast('Contraseña actualizada!');
      goToProfile();
    } catch (error) {
      showAlertDialog('Error al actualizar la contraseña');
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
          showsVerticalScrollIndicator={false}
          f={1}
          p='$6'
          space='$3'
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Logo />

          <Label size={'$1'} ta='center'>
            Aqui puedes cambiar la contraseña que desees agregar siempre y cuanto esta cumple con
            las especificaciones para que sea una contraseña segura.
          </Label>

          <FormInput
            isSecure
            label='Escriba su nueva contraseña'
            placeholder='Escriba su nueva contraseña'
            value={updateForm.password}
            onChangeText={(text) => {
              setupdateForm({ ...updateForm, password: text });
            }}
          />

          <FormButtons
            firstButtonAction={goToProfile}
            secondButtonAction={newPassword}
            secondButtonText='Actualizar'
            firstButtonText='Cancelar'
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
