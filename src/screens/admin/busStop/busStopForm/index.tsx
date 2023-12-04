import React, { useState, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { H4, H5, ScrollView, XStack } from 'tamagui';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useLoader } from '@/contexts/loader';

import { busStopService } from '@/services/busStop';

import { TogleSidebar } from '@/components/togleSidebar';
import { FormInput } from '@/components/formInput';
import { PickLocation } from '@/components/pickLocation';
import { FormButtons } from '@/components/formButtons';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { showSuccessToast } from '@/utils/toast';

import { initBusStopForm } from '@/constants/forms';

export const BusStopForm = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();
  const route = useRoute();
  const busStop = route.params;

  const [formValues, setFormValues] = useState(null);

  const handlerService = async () => {
    if (validateForm()) {
      showLoader();

      try {
        const data = {
          name: formValues.name,
          coordinate: {
            latitude: Number(formValues.coordinate.latitude),
            longitude: Number(formValues.coordinate.longitude),
          },
        };

        busStop
          ? await busStopService.updateById(busStop.id, data)
          : await busStopService.create(data);

        busStop
          ? showSuccessToast('Parada Actualizada!')
          : showSuccessDialog('Parada creada con exito!');

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

    if (!formValues.coordinate) {
      showAlertDialog('Seleccione la ubicación de de la parada');
      return false;
    }

    return true;
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (busStop) {
      setFormValues(busStop);
    } else {
      setFormValues(initBusStopForm);
    }
  }, [busStop]);

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

          <H4 color={'$color'}>{busStop ? 'Actualizar Parada' : 'Nueva Parada'} </H4>

          <FormInput
            label='Nombre:'
            placeholder='Escriba el nombre de la parada'
            value={formValues?.name}
            onChangeText={(text) => {
              setFormValues({ ...formValues, name: text });
            }}
          />

          <H5 textAlign='center' textTransform='capitalize'>
            Coordenadas
          </H5>

          <FormInput
            label='Latitud:'
            placeholder='Latitud de la ubicación'
            editable={false}
            value={formValues?.coordinate?.latitude.toString()}
          />

          <FormInput
            label='Longitud:'
            placeholder='Longitud de la ubicación'
            editable={false}
            value={formValues?.coordinate?.longitude.toString()}
          />

          <PickLocation
            changeValue={(value) => {
              setFormValues({ ...formValues, coordinate: value });
            }}
            coordinate={formValues?.coordinate}
            markerName={formValues?.name}
          />

          <FormButtons
            firstButtonAction={goBack}
            secondButtonText={busStop ? 'Actualizar' : 'Crear'}
            secondButtonAction={handlerService}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
