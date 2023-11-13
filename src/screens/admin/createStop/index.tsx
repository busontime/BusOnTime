import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, Form, Label, ScrollView, SizableText, Spinner, View, XStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { MapPin, X } from 'lucide-react-native';

import { FormInput } from '@/components/formInput';

import { busStopService } from '@/services/busStop';

import { showAlertDialog, showSuccessDialog } from '@/utils/dialog';
import { stylesMap } from './styles';

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
  const [startMarker, setStartMarker] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setStartMarker({ id: 'start', coordinate });
    setFormValues({
      ...formValues,
      coordinate: {
        latitude: String(coordinate.latitude),
        longitude: String(coordinate.longitude),
      },
    });
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
                editable={false}
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
                editable={false}
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
            <XStack
              width={'$20'}
              space={3}
              alignItems='center'
              onPress={() => {
                setShowModal(true);
              }}>
              <MapPin size={30} color='#0eff0a' strokeWidth={3} />
              <SizableText color={'$color'} fontWeight={'bold'} textAlign='center'>
                Seleccionar coordenada
              </SizableText>
            </XStack>

            {showModal && (
              <Modal animationType='slide' visible={true}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 2,
                  }}
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <X size={35} color='#ff0a0a' />
                </TouchableOpacity>
                <MapView
                  mapType='standard'
                  customMapStyle={stylesMap.styles}
                  initialRegion={{
                    latitude: -0.967653,
                    longitude: -80.70891,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  }}
                  onPress={handleMapPress}
                  style={{ height: '100%', width: '100%' }}>
                  {startMarker && (
                    <Marker
                      key={startMarker.id}
                      coordinate={startMarker.coordinate}
                      pinColor='#0eff0a'
                    />
                  )}
                </MapView>
              </Modal>
            )}

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
