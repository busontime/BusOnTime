import { cooperativeService } from '@/services/cooperative';
import React, { useEffect, useState } from 'react';
import { Button, Card, H4, ScrollView, Text, XStack, YStack, Dialog, Adapt, Sheet } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { Pencil, Trash2 } from 'lucide-react-native';
import { showSuccessToast } from '@/utils/toast';

export const CooperativeList = () => {
  const [cooperatives, setCooperatives] = useState([]);
  const [open, setOpen] = useState(false);
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
      <H4 color={'$color'} textAlign='center'>
        Lista de Cooperativas
      </H4>

      <Button
        pos='absolute'
        top={'$2.5'}
        right={'$2.5'}
        size={'$3.5'}
        variant='outlined'
        backgroundColor={'$blue8'}
        onPress={() => {
          navigation.navigate('create-coopetative' as never);
        }}>
        Nuevo
      </Button>

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
                  <Dialog
                    modal
                    onOpenChange={() => {
                      setOpen(open);
                    }}>
                    <Dialog.Trigger asChild>
                      <Button size={'$3'} icon={<Trash2 />} variant='outlined' bg={'$red8'} />
                    </Dialog.Trigger>

                    <Adapt when='sm' platform='touch'>
                      <Sheet animation='medium' zIndex={200000} modal dismissOnSnapToBottom>
                        <Sheet.Frame padding='$4' gap='$4'>
                          <Adapt.Contents />
                        </Sheet.Frame>

                        <Sheet.Overlay
                          animation='medium'
                          enterStyle={{ opacity: 0 }}
                          exitStyle={{ opacity: 0 }}
                        />
                      </Sheet>
                    </Adapt>

                    <Dialog.Portal>
                      <Dialog.Overlay
                        key='overlay'
                        animation='medium'
                        opacity={0.5}
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                      />

                      <Dialog.Content
                        bordered
                        elevate
                        key='content'
                        animateOnly={['transform', 'opacity']}
                        animation={[
                          'medium',
                          {
                            opacity: {
                              overshootClamping: true,
                            },
                          },
                        ]}
                        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                        gap='$4'>
                        <Dialog.Description>
                          ¿Está seguro que desea eliminar la cooperativa {item?.name}?
                        </Dialog.Description>

                        <XStack space='$5' jc='center' ai='center'>
                          <Dialog.Close displayWhenAdapted asChild>
                            <Button
                              onPress={() => {
                                deleteCooperative(item?.id);
                              }}
                              color={'$color'}
                              fontWeight={'$true'}
                              aria-label='Close'
                              bg={'$blue8'}>
                              Eliminar
                            </Button>
                          </Dialog.Close>

                          <Dialog.Close displayWhenAdapted asChild>
                            <Button
                              color={'$color'}
                              aria-label='Close'
                              fontWeight={'$true'}
                              bg={'$red8'}>
                              Cancelar
                            </Button>
                          </Dialog.Close>
                        </XStack>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog>

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
