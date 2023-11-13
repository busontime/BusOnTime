import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Button, Form, Label, ScrollView, SizableText, Spinner, View, XStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { FormInput } from '@/components/formInput';
import { busStopService } from '@/services/busStop';
import { showAlertDialog, showSuccessDialog } from '@/utils/dialog';

const initForm = {
  name: '',
  coordinate: {
    latitude: '',
    longitude: '',
  },
};

export const CreateStop = () => {
  const [formValues, setFormValues] = useState(initForm);
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const navigation = useNavigation();

  const create = async () => {
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

        await busStopService.createStop(data);
        showSuccessDialog('Linea creada con exito');
        navigation.goBack();
      } catch (error) {
        console.log('error al crear la parada');
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
                value={formValues.coordinate.latitude}
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
                value={formValues.coordinate.longitude}
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
                  await create();
                }}>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  {status === 'submitting' ? 'Creando' : 'Crear'}
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
