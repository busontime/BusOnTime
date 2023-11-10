import React, { useEffect, useState } from 'react';
import { Button, Form, Label, ScrollView, SizableText, Spinner, View, XStack } from 'tamagui';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FormInput } from '@/components/formInput';
import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { busStopService } from '@/services/busStop';

const initForm = {
  name: '',
  coordinate: {
    latitude: '',
    longitude: '',
  },
};

export const UpdateStops = () => {
  const [formValues, setFormValues] = useState(initForm);
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const route = useRoute();
  const navigation = useNavigation();
  const idStop = route.params;

  const update = async () => {
    if (validateForm()) {
      setStatus('submitting');
      try {
        const data = {
          name: formValues.name,
          coordinate: {
            latitude: Number(formValues.coordinate.latitude),
            longitude: Number(formValues.coordinate.longitude),
          },
        };
        await busStopService.updateStopById(idStop, data);
        showSuccessDialog('Parada Actualizada');
        navigation.goBack();
      } catch (error) {
        showErrorDialog('error al actualizar la parada');
        console.log('error al actualizar la parada de bus', error);
      } finally {
        setStatus('submitted');
      }
    }
  };

  const validateForm = () => {
    if (formValues.name === '') {
      showAlertDialog('El nombre de la linea esta vacio');
      return false;
    }

    if (formValues.coordinate.latitude === '') {
      showAlertDialog('La latitud es requerida');
      return false;
    }

    if (formValues.coordinate.longitude === '') {
      showAlertDialog('La longitud es requerida');
      return false;
    }
    return true;
  };

  const getStop = async () => {
    try {
      const response = await busStopService.getStopById(idStop);
      setFormValues(response?._data);
    } catch (error) {
      console.log('error al obtener la parada de bus');
    }
  };
  useEffect(() => {
    getStop();
  }, []);

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
          <Form
            alignItems='center'
            height='100%'
            width='100%'
            gap='$3'
            onSubmit={() => {
              setStatus('submitting');
            }}
            padding='$8'>
            <View>
              <Label>Nombre:</Label>
              <FormInput
                placeholder='Nombre'
                value={formValues.name}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, name: text });
                }}
              />
            </View>
            <Label textAlign='center'>Coordenadas</Label>
            <View>
              <Label>Latitud:</Label>
              <FormInput
                placeholder='Nombre'
                type={'numeric'}
                value={formValues.coordinate.latitude.toString()}
                onChangeText={(text) => {
                  setFormValues({
                    ...formValues,
                    coordinate: { ...formValues.coordinate, latitude: text },
                  });
                }}
              />
            </View>
            <View>
              <Label>Latitud:</Label>
              <FormInput
                placeholder='Nombre'
                type={'numeric'}
                value={formValues.coordinate.longitude.toString()}
                onChangeText={(text) => {
                  setFormValues({
                    ...formValues,
                    coordinate: { ...formValues.coordinate, longitude: text },
                  });
                }}
              />
            </View>
            <XStack space='$5' mt='$3'>
              <Button
                w={'$10'}
                size='$3'
                bg='$green8'
                icon={status === 'submitting' ? () => <Spinner /> : undefined}
                onPress={async () => {
                  await update();
                }}>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  Actualizar
                </SizableText>
              </Button>

              <Button
                w={'$10'}
                bg={status === 'submitting' ? '$gray10' : '$red9'}
                disabled={status === 'submitting'}
                onPress={() => {
                  navigation.goBack();
                }}
                size='$3'>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  Cancelar
                </SizableText>
              </Button>
            </XStack>
          </Form>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
