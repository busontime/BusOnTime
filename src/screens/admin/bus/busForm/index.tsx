import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { ScrollView, H4, XStack } from 'tamagui';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useLoader } from '@/contexts/loader';

import { busService } from '@/services/bus';
import { cooperativeService } from '@/services/cooperative';

import { TogleSidebar } from '@/components/togleSidebar';
import { FormInput } from '@/components/formInput';
import { FormSelect } from '@/components/formSelect';
import { FormButtons } from '@/components/formButtons';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { showSuccessToast } from '@/utils/toast';

import { initBusForm } from '@/constants/forms';

export const BusForm = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();
  const route = useRoute();
  const bus = route.params;

  const [formValues, setFormValues] = useState(null);
  const [cooperatives, setCooperatives] = useState([]);

  const handlerService = async () => {
    if (validateForm()) {
      showLoader();

      try {
        const data = {
          name: formValues.name,
          license_plate: formValues.license_plate,
          cooperativeId: formValues.cooperativeId,
          inUse: formValues.inUse,
        };

        bus ? await busService.updateById(bus.id, data) : await busService.create(data);

        bus ? showSuccessToast('Bus Actualizado!') : showSuccessDialog('Bus creado con éxito!');

        goBack();
      } catch (error) {
        showErrorDialog('ocurrió un error inténtelo más tarde');
        console.log(error, 'error en el handler service');
      } finally {
        hideLoader();
      }
    }
  };

  const validateForm = () => {
    if (formValues.name === '') {
      showAlertDialog('El nombre no debe estar vacío');
      return false;
    }

    if (formValues.license_plate === '') {
      showAlertDialog('La placa no debe estar vacía');
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
    showLoader();

    try {
      const data = await cooperativeService.getAll();
      setCooperatives(data);
    } catch (error) {
      console.log('Error al recuperar todas las cooperativas', error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getCooperatives();
  }, []);

  useEffect(() => {
    if (bus) {
      setFormValues(bus);
    } else {
      setFormValues(initBusForm);
    }
  }, [bus]);

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

          <H4 color={'$color'}>{bus ? 'Actualizar Bus' : 'Nuevo Bus'}</H4>

          <FormInput
            label='Nombre:'
            placeholder='Escribe el nombre del bus'
            value={formValues?.name}
            onChangeText={(text) => {
              setFormValues({ ...formValues, name: text });
            }}
          />

          <FormInput
            label='Placa:'
            placeholder='Escribe la placa del bus'
            value={formValues?.license_plate}
            onChangeText={(text) => {
              setFormValues({ ...formValues, license_plate: text });
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
            secondButtonText={bus ? 'Actualizar' : 'Crear'}
            secondButtonAction={handlerService}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
