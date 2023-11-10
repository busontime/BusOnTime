import { AlertDialog, Button, Card, H6, ScrollView, Text, XStack, YStack } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pencil, Trash2 } from 'lucide-react-native';

import { busStopService } from '@/services/busStop';

import { HeaderList } from '@/components/admin/headerList';
import { showSuccessToast } from '@/utils/toast';

export const StopList = () => {
  const [stops, setStops] = useState([]);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const response = await busStopService.getAllStops();
      setStops(response);
    } catch (error) {
      console.log('error al traer las paradas de buses', error);
    }
  };

  const deleteStop = async (id: string) => {
    try {
      await busStopService.deleteStopById(id);
    } catch (error) {
      console.log(error);
    } finally {
      showSuccessToast('Cooperativa Eliminada Exitosamente!');
      await getData();
    }
  };

  const updateDoc = (id: string) => {
    navigation.navigate('update-stop', id);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const actualizarParadas = navigation.addListener('focus', () => {
      getData();
    });
    return actualizarParadas;
  }, [navigation]);

  return (
    <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$2' pos='relative'>
      <HeaderList
        title='Lista de Paradas'
        onPress={() => {
          navigation.navigate('create-stop' as never);
        }}
      />

      <ScrollView
        f={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {stops.map((item, index) => (
          <Card elevate bordered size={'$3.5'} key={index} w={'$20'} mb='$5'>
            <Card.Header padded>
              <YStack space='$1'>
                <XStack space='$2'>
                  <Text color={'$color'} fontWeight={'$true'}>
                    Nombre:
                  </Text>
                  <Text color={'$color'} fontStyle='italic'>
                    {item?.name}
                  </Text>
                </XStack>
                <H6 textAlign='center' mt='$1'>
                  Cordenadas
                </H6>
                <XStack space='$2'>
                  <Text color={'$color'} fontWeight={'$true'}>
                    Latitud:
                  </Text>
                  <Text color={'$color'} fontStyle='italic'>
                    {item?.coordinate?.latitude}
                  </Text>
                </XStack>

                <XStack space='$2'>
                  <Text color={'$color'} fontWeight={'$true'}>
                    Longitud:
                  </Text>
                  <Text color={'$color'} fontStyle='italic'>
                    {item?.coordinate?.longitude}
                  </Text>
                </XStack>

                <XStack justifyContent='flex-end' space='$3'>
                  <Button
                    size={'$3'}
                    icon={<Pencil />}
                    variant='outlined'
                    bg={'$green8'}
                    onPress={() => {
                      updateDoc(item?.id);
                    }}
                  />
                  <XStack>
                    <AlertDialog>
                      <AlertDialog.Trigger asChild>
                        <Button size={'$3'} icon={<Trash2 />} variant='outlined' bg={'$red8'} />
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay
                          key='overlay'
                          animation='quick'
                          opacity={0.5}
                          enterStyle={{ opacity: 0 }}
                          exitStyle={{ opacity: 0 }}
                        />
                        <AlertDialog.Content
                          bordered
                          elevate
                          key='content'
                          animation={[
                            'quick',
                            {
                              opacity: {
                                overshootClamping: true,
                              },
                            },
                          ]}
                          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                          x={0}
                          scale={1}
                          opacity={1}
                          y={0}>
                          <YStack space>
                            <AlertDialog.Title size={10}>Eliminar Linea</AlertDialog.Title>
                            <AlertDialog.Description>
                              <Text>Está seguro que desea eliminar la linea {item?.name} </Text>
                            </AlertDialog.Description>
                            <XStack space='$3' justifyContent='flex-end'>
                              <AlertDialog.Cancel asChild>
                                <Button
                                  color={'$color'}
                                  aria-label='Close'
                                  fontWeight={'$true'}
                                  bg={'$red8'}>
                                  Cancelar
                                </Button>
                              </AlertDialog.Cancel>
                              <AlertDialog.Action asChild>
                                <Button
                                  onPress={() => {
                                    deleteStop(item?.id);
                                  }}
                                  color={'$color'}
                                  fontWeight={'$true'}
                                  aria-label='Close'
                                  bg={'$blue8'}>
                                  Eliminar
                                </Button>
                              </AlertDialog.Action>
                            </XStack>
                          </YStack>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog>
                  </XStack>
                </XStack>
              </YStack>
            </Card.Header>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
};
