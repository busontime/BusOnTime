import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Form,
  Label,
  View,
  ScrollView,
  SizableText,
  Spinner,
  Stack,
  XStack,
  YStack,
} from 'tamagui';
import { BadgePlus, BadgeX } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { lineService } from '@/services/line';

import { FormInput } from '@/components/formInput';
import { showAlertToast } from '@/utils/toast';
import { showAlertDialog } from '@/utils/dialog';
import ColorPicker from 'react-native-wheel-color-picker';

const initForm = {
  lineColor: '#fff',
  name: '',
  destination: {
    latitude: '',
    longitude: '',
  },
  origin: {
    latitude: '',
    longitude: '',
  },
  stops: [
    {
      latitude: '',
      longitude: '',
    },
  ],
};

export const CreateLine = () => {
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const [formValues, setFormValues] = useState(initForm);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const create = async () => {
    if (validateForm()) {
      try {
        const data = {
          lineColor: formValues.lineColor,
          name: formValues.name,
          destination: {
            latitude: Number(formValues.destination.latitude),
            longitude: Number(formValues.destination.longitude),
          },
          origin: {
            latitude: Number(formValues.origin.latitude),
            longitude: Number(formValues.origin.longitude),
          },
          stops: formValues.stops.map((item) => ({
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
          })),
        };

        const info = await lineService.createLine(data);
        navigation.goBack();
        console.log('info', info);
      } catch (error) {
        console.log('error al crear la linea', error);
      }
    }
  };

  const addStop = () => {
    if (formValues.stops.some((item) => item.latitude === '' || item.longitude === '')) {
      showAlertToast('llenos los campos antes de agregar uno nuevo');
      return;
    }
    const newStop = { latitude: '', longitude: '' };
    const newStops = [...formValues.stops, newStop];
    setFormValues({ ...formValues, stops: newStops });
  };

  const removeStop = (index) => {
    if (formValues.stops.length > 1) {
      const newStops = [...formValues.stops];
      newStops.splice(index, 1);
      setFormValues({ ...formValues, stops: newStops });
    }
  };

  const validateForm = () => {
    if (formValues.name === '') {
      showAlertDialog('El nombre de la linea esta vacio');
      return false;
    }
    if (formValues.origin.latitude === '') {
      showAlertDialog('La latitud del origen esta vacia');
      return false;
    }
    if (formValues.origin.longitude === '') {
      showAlertDialog('La longitud del origen esta vacia');
      return false;
    }
    if (formValues.destination.latitude === '') {
      showAlertDialog('La latitud del destino esta vacia');
      return false;
    }
    if (formValues.destination.longitude === '') {
      showAlertDialog('La longitud del destino esta vacia');
      return false;
    }
    if (formValues.stops.some((item) => item.latitude === '' || item.longitude === '')) {
      showAlertDialog('Llene los campos de la parada');
      return false;
    }
    if (formValues.lineColor === '') {
      showAlertDialog('El color de la linea esta vacio');
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
              <Label>Nombre de linea:</Label>
              <FormInput
                placeholder='Nombre'
                value={formValues.name}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, name: text });
                }}
              />
            </View>

            <View>
              <Label>Selecciona un color</Label>
              <XStack jc='space-between' ai='center' space='$2'>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                  }}>
                  <FormInput
                    placeholder='Seleccione un color'
                    w='$18'
                    editable={false}
                    value={formValues.lineColor}
                  />
                </TouchableOpacity>
                <Stack bg={formValues.lineColor} borderRadius={'$5'} w='$3' height={'$3'} />
              </XStack>
            </View>
            {modalVisible && (
              <ColorPicker
                row={false}
                gapSize={10}
                color={formValues.lineColor}
                thumbSize={30}
                sliderSize={30}
                onColorChange={(color) => {
                  setFormValues({ ...formValues, lineColor: color });
                }}
                style={{
                  width: '90%',
                  height: 300,
                  paddingVertical: 10,
                }}
              />
            )}

            <View>
              <YStack>
                <Label>Origen:</Label>
                <XStack space='$1'>
                  <XStack>
                    <FormInput
                      w='$12'
                      type={'numeric'}
                      placeholder='Latitud'
                      value={formValues.origin.latitude}
                      onChangeText={(text) => {
                        setFormValues({
                          ...formValues,
                          origin: {
                            ...formValues.origin,
                            latitude: text,
                          },
                        });
                      }}
                    />
                  </XStack>
                  <XStack>
                    <FormInput
                      w='$12'
                      type={'numeric'}
                      placeholder='Longitud'
                      value={formValues.origin.longitude}
                      onChangeText={(text) => {
                        setFormValues({
                          ...formValues,
                          origin: {
                            ...formValues.origin,
                            longitude: text,
                          },
                        });
                      }}
                    />
                  </XStack>
                </XStack>
              </YStack>
            </View>

            <View>
              <YStack>
                <Label>Destino:</Label>
                <XStack space='$1'>
                  <XStack>
                    <FormInput
                      w='$12'
                      type={'numeric'}
                      placeholder='Latitud'
                      value={formValues.destination.latitude}
                      onChangeText={(text) => {
                        setFormValues({
                          ...formValues,
                          destination: {
                            ...formValues.destination,
                            latitude: text,
                          },
                        });
                      }}
                    />
                  </XStack>
                  <XStack>
                    <FormInput
                      w='$12'
                      type={'numeric'}
                      placeholder='Longitud'
                      value={formValues.destination.longitude}
                      onChangeText={(text) => {
                        setFormValues({
                          ...formValues,
                          destination: {
                            ...formValues.destination,
                            longitude: text,
                          },
                        });
                      }}
                    />
                  </XStack>
                </XStack>
              </YStack>
            </View>

            <View>
              <XStack justifyContent='center' space='$3' alignItems='center' marginVertical={'$2'}>
                <Label>Paradas:</Label>
                <TouchableOpacity
                  onPress={() => {
                    addStop();
                  }}>
                  <BadgePlus size={28} color='green' />
                </TouchableOpacity>
              </XStack>
              {formValues.stops.map((item, index) => (
                <XStack space='$2.5' ai='center' key={index} marginVertical={'$1'}>
                  <FormInput
                    w='$11'
                    type={'numeric'}
                    placeholder='Latitud'
                    value={item.latitude}
                    onChangeText={(text) => {
                      const newStops = [...formValues.stops];
                      newStops[index].latitude = text;
                      setFormValues({ ...formValues, stops: newStops });
                    }}
                  />
                  <FormInput
                    w='$11'
                    type={'numeric'}
                    placeholder='Longitud'
                    value={item.longitude}
                    onChangeText={(text) => {
                      const newStops = [...formValues.stops];
                      newStops[index].longitude = text;
                      setFormValues({ ...formValues, stops: newStops });
                    }}
                  />
                  {formValues.stops.length > 1 && (
                    <TouchableOpacity
                      onPress={() => {
                        removeStop(index);
                      }}>
                      <BadgeX size={28} color='red' />
                    </TouchableOpacity>
                  )}
                </XStack>
              ))}
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
                  {status === 'submitting' ? 'Creando...' : 'Crear'}
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
