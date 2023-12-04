import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, H4, XStack } from 'tamagui';

import { useLoader } from '@/contexts/loader';

import { cooperativeService } from '@/services/cooperative';

import { TogleSidebar } from '@/components/togleSidebar';
import { FormInput } from '@/components/formInput';
import { FormButtons } from '@/components/formButtons';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';

import { initCooperativeForm } from '@/constants/forms';

export const CreateCooperative = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();

  const [formValues, setFormValues] = useState(initCooperativeForm);

  const create = async () => {
    if (validateForm()) {
      showLoader();

      try {
        const data = {
          name: formValues.name,
          alias: formValues.alias,
          date_foundation: formValues.date_foundation,
        };

        await cooperativeService.create(data);

        showSuccessDialog('Cooperativa creada con exito!');
        goBack();
      } catch (error) {
        showErrorDialog('Ocurrió un error inténtelo más tarde');
        console.log('Error al crear la cooperativa', error);
      } finally {
        hideLoader();
      }
    }
  };

  const validateForm = () => {
    if (formValues.name === '') {
      showAlertDialog('Llene el nombre!');
      return false;
    }

    return true;
  };

  const goBack = () => {
    navigation.goBack();
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
          p='$5'
          f={1}
          space='$3'
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <XStack width={'100%'}>
            <TogleSidebar />
          </XStack>

          <H4 color={'$color'}>Nueva Cooperativa</H4>

          <FormInput
            label='Nombre:'
            placeholder='Escribe el nombre de la cooperativa'
            value={formValues.name}
            onChangeText={(text) => {
              setFormValues({ ...formValues, name: text });
            }}
          />

          <FormInput
            isDate
            label='Fecha de fundación:'
            placeholder='Seleccione la fecha de fundación'
            editable={false}
            dateValue={formValues.date_foundation}
            onChangeText={(value) => {
              setFormValues({ ...formValues, date_foundation: value });
            }}
          />

          <FormInput
            label='Alias:'
            placeholder='Escriba una alias para la cooperativa'
            value={formValues.alias}
            onChangeText={(text) => {
              setFormValues({ ...formValues, alias: text });
            }}
          />

          <FormButtons
            firstButtonAction={goBack}
            secondButtonText='Crear'
            secondButtonAction={create}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
