import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView, H4, H5, XStack } from 'tamagui';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BusFront } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';
import { useLoader } from '@/contexts/loader';

import { lineService } from '@/services/line';
import { busStopService } from '@/services/busStop';

import { TogleSidebar } from '@/components/togleSidebar';
import { FormInput } from '@/components/formInput';
import { FormSelect } from '@/components/formSelect';
import { FormGroup } from '@/components/formGroup';
import { FormButtons } from '@/components/formButtons';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { showSuccessToast } from '@/utils/toast';

import { initLineForm } from '@/constants/forms';
import { COLORS } from '@/constants/styles';

export const LineForm = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();
  const route = useRoute();
  const line = route.params;

  const [formValues, setFormValues] = useState(null);
  const [busStops, setBusStops] = useState([]);

  const { isDark } = useThemeContext();

  const handlerService = async () => {
    if (validateForm()) {
      showLoader();

      try {
        const data = {
          name: formValues.name,
          lineColor: formValues.lineColor,
          origin: formValues.origin,
          destination: formValues.destination,
          stops: formValues.stops,
          route: formValues.route,
        };

        line ? await lineService.updateById(line.id, data) : await lineService.create(data);

        line
          ? showSuccessToast('Linea Actualizada!')
          : showSuccessDialog('Linea creada con éxito!');

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

    if (formValues.lineColor === '') {
      showAlertDialog('Seleccione un color');
      return false;
    }

    if (!formValues.origin) {
      showAlertDialog('Seleccione una parada de origen');
      return false;
    }

    if (!formValues.destination) {
      showAlertDialog('Seleccione una parada de destino');
      return false;
    }

    if (formValues.stops.length <= 0) {
      showAlertDialog('Seleccione al menos una parada');
      return false;
    }

    return true;
  };

  const changeSelectValue = (id, prop) => {
    const busStop = busStops.find((item) => item.id === id);

    if (busStop) {
      setFormValues({ ...formValues, [prop]: busStop });
    } else {
      setFormValues({ ...formValues, [prop]: null });
    }
  };

  const changeGroupValue = (value) => {
    const newBusStops = busStops.filter((item) => value.includes(item.id));
    setFormValues({ ...formValues, stops: newBusStops });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const getBusStops = async () => {
    showLoader();

    try {
      const data = await busStopService.getAll();
      setBusStops(data);
    } catch (error) {
      console.log('Error al recuperar todas las paradas', error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getBusStops();
  }, []);

  useEffect(() => {
    if (line) {
      setFormValues(line);
    } else {
      setFormValues(initLineForm);
    }
  }, [line]);

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

          <H4 color={'$color'}>{line ? 'Actualizar Linea' : 'Nueva Linea'}</H4>

          <FormInput
            label='Nombre:'
            placeholder='Escriba el nombre de la linea'
            value={formValues?.name}
            onChangeText={(text) => {
              setFormValues({ ...formValues, name: text });
            }}
          />

          <FormInput
            isColor
            w='$17'
            label='Color:'
            placeholder='Seleccione un color'
            editable={false}
            value={formValues?.lineColor}
            onChangeText={(text) => {
              setFormValues({ ...formValues, lineColor: text });
            }}
          />

          <FormSelect
            label='Origen:'
            placeholder='Selecciona la parada de origen'
            value={formValues?.origin?.id}
            options={busStops}
            onValueChange={(value) => {
              changeSelectValue(value, 'origin');
            }}
          />

          <FormSelect
            label='Destino:'
            placeholder='Selecciona la parada de destino'
            value={formValues?.destination?.id}
            options={busStops}
            onValueChange={(value) => {
              changeSelectValue(value, 'destination');
            }}
          />

          <H5 textAlign='center' marginVertical='$1' textTransform='capitalize'>
            Paradas
          </H5>

          <FormGroup
            options={busStops}
            value={formValues?.stops.map((item) => item.id)}
            onValueChange={changeGroupValue}
            icon={<BusFront color={isDark ? COLORS.light : COLORS.dark} size={25} />}
          />

          <FormButtons
            firstButtonAction={goBack}
            secondButtonText={line ? 'Actualizar' : 'Crear'}
            secondButtonAction={handlerService}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
