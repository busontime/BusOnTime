import React, { useEffect, useState } from 'react';
import { Button, Card, ScrollView, Text, XStack, YStack, AlertDialog } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { Pencil, Trash2 } from 'lucide-react-native';

import { cooperativeService } from '@/services/cooperative';

import { HeaderList } from '@/components/admin/headerList';

import { showSuccessToast } from '@/utils/toast';

export const CooperativeList = () => {
  const [cooperatives, setCooperatives] = useState([]);

  const navigation = useNavigation();

  const getCooperatives = async () => {
    try {
      const data = await cooperativeService.getAllCooperative();
      setCooperatives(data);
    } catch (error) {
      console.log('error al traer las cooperativas', error);
    }
  };

  const deleteCooperative = async (id: string) => {
    try {
      await cooperativeService.deleteCooperativeById(id);
    } catch (error) {
      console.log(error);
    } finally {
      showSuccessToast('Cooperativa Eliminada Exitosamente!');
      await getCooperatives();
    }
  };

  const updateDoc = (id: string) => {
    navigation.navigate('update-coopetative', id);
  };

  useEffect(() => {
    getCooperatives();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCooperatives();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$2' pos='relative'>
      <HeaderList
        title='Lista de Cooperativas'
        onPress={() => {
          navigation.navigate('create-coopetative' as never);
        }}
      />

      <ScrollView
        f={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {cooperatives.map((item, index) => (
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
                <XStack space='$2'>
                  <Text color={'$color'} fontWeight={'$true'}>
                    Alias:
                  </Text>
                  <Text color={'$color'} fontStyle='italic'>
                    {item?.alias}
                  </Text>
                </XStack>

                <XStack space='$2'>
                  <Text color={'$color'} fontWeight={'$true'}>
                    Fecha de fundación:
                  </Text>
                  <Text color={'$color'} fontStyle='italic'>
                    {item?.date_foundation}
                  </Text>
                </XStack>

                <XStack jc='flex-end' space='$3' mt='$2'>
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
                          <AlertDialog.Title size={10}>Eliminar Cooperativa</AlertDialog.Title>
                          <AlertDialog.Description>
                            <Text>Está seguro que desea eliminar la Cooperativa {item?.name}</Text>
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
                              asChild
                              onPress={() => {
                                deleteCooperative(item?.id);
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

                  <Button
                    size={'$3'}
                    icon={<Pencil />}
                    variant='outlined'
                    bg={'$green8'}
                    onPress={() => {
                      updateDoc(item?.id);
                    }}
                  />
                </XStack>
              </YStack>
            </Card.Header>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
};
