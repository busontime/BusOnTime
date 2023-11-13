import React, { useEffect, useState } from 'react';
import { AlertDialog, Button, Card, ScrollView, Text, XStack, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { HeaderList } from '@/components/admin/headerList';
import { lineService } from '@/services/line';

import { Pencil, Trash2 } from 'lucide-react-native';
import { showSuccessToast } from '@/utils/toast';

export const LineList = () => {
  const [line, setLine] = useState([]);
  const navigation = useNavigation();

  const getLines = async () => {
    try {
      const response = await lineService.getAll();
      setLine(response);
    } catch (error) {
      console.log('Error al traer todas las lineas', error);
    }
  };

  const updateDoc = (docId: string) => {
    navigation.navigate('update-line', docId);
  };

  const deleteLine = async (lineId) => {
    try {
      await lineService.deleteLineById(lineId);
    } catch (error) {
      console.log('Error al eliminar la linea');
    } finally {
      showSuccessToast('Linea Eliminada Exitosamente!');
      await getLines();
    }
  };

  useEffect(() => {
    getLines();
  }, []);

  useEffect(() => {
    const actualizarLineas = navigation.addListener('focus', () => {
      getLines();
    });
    return actualizarLineas;
  }, [navigation]);

  return (
    <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$2' pos='relative'>
      <HeaderList
        title='Lista de Lineas'
        onPress={() => {
          navigation.navigate('create-line' as never);
        }}
      />

      <ScrollView
        space='$3'
        f={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {line.map((item, index) => (
          <Card elevate bordered size={'$3.5'} key={index} w={'$20'}>
            <Card.Header padded>
              <XStack space='$2'>
                <Text color={'$color'} fontWeight={'$true'}>
                  Nombre:
                </Text>
                <Text color={'$color'} fontStyle='italic'>
                  {item?.name}
                </Text>
              </XStack>

              <XStack space='$2'>
                <Text color={'$color'} fontWeight={'$true'}>
                  Color de linea:
                </Text>
                <Text color={'$color'} fontStyle='italic'>
                  {item?.lineColor}
                </Text>
              </XStack>

              <XStack space='$2'>
                <Text color={'$color'} fontWeight={'$true'}>
                  Origen:
                </Text>
                <Text color={'$color'} fontStyle='italic'>
                  {item.origin?.latitude}
                </Text>
                <Text color={'$color'}>,</Text>
                <Text color={'$color'} fontStyle='italic'>
                  {item.origin?.longitude}
                </Text>
              </XStack>

              <XStack space='$2'>
                <Text color={'$color'} fontWeight={'$true'}>
                  Destino:
                </Text>
                <Text color={'$color'} fontStyle='italic'>
                  {item.destination?.latitude}
                </Text>
                <Text color={'$color'}>,</Text>
                <Text color={'$color'} fontStyle='italic'>
                  {item.destination?.longitude}
                </Text>
              </XStack>

              <Text color={'$color'} fontWeight={'$true'}>
                Paradas:
              </Text>
              {item?.stops?.map((stop, index) => (
                <XStack space='$2' key={index}>
                  <Text color={'$color'} fontStyle='italic' key={index}>
                    {stop?.latitude}
                    <Text color={'$color'}>,</Text>
                    {stop?.longitude}
                  </Text>
                </XStack>
              ))}

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
                            <AlertDialog.Action
                              onPress={() => {
                                deleteLine(item?.id);
                              }}>
                              <Button
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
            </Card.Header>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
};
