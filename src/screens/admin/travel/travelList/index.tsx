import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Card, Stack, YStack, Button, H4, Text } from 'tamagui';

import { Trash2 } from 'lucide-react-native';

import { travelService } from '@/services/travel';

import { CardItem } from '@/components/admin/cardItem';
import { ModalOptions } from '@/components/modalOptions';

import { showSuccessToast } from '@/utils/toast';
import { convertFirestoreDateToString, getTravelStatus } from '@/utils/helpers';

export const TravelList = () => {
  const navigation = useNavigation();

  const [travels, setTravels] = useState([]);

  const getTravels = async () => {
    try {
      const data = await travelService.getAll();
      setTravels(data);
    } catch (error) {
      console.log('Error al recuperar todos los recorridos', error);
    }
  };

  const deleteTravel = async (id: string) => {
    try {
      await travelService.deleteById(id);
      showSuccessToast('Recorrido Eliminado Exitosamente!');
    } catch (error) {
      console.log(error);
    } finally {
      await getTravels();
    }
  };

  useEffect(() => {
    getTravels();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getTravels();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$3'>
      <H4 color={'$color'} textAlign='center'>
        Lista de Recorridos
      </H4>

      <ScrollView
        f={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {travels.map((item, index) => (
          <Card
            key={index}
            elevate
            bordered
            paddingVertical='$3'
            paddingHorizontal='$5'
            size={'$3.5'}
            w={'$20'}
            mb='$4'>
            <CardItem
              label='Conductor:'
              value={item?.driver?.name + ' ' + item?.driver?.lastname}
            />

            <CardItem label='Fecha:' value={convertFirestoreDateToString(item?.date)} />

            <CardItem label='Hora de Inicio:' value={item?.startTime} />

            <CardItem label='Hora de Fin:' value={item?.endTime} />

            <CardItem label='Linea:' value={item?.line?.name} />

            <CardItem label='Bus:' value={item?.bus?.name} />

            <CardItem
              label='Estado:'
              value={getTravelStatus(item?.state).label}
              color={getTravelStatus(item?.state).color}
            />

            {item.cancellation_message && (
              <CardItem label='Motivo de cancelación' value={item?.cancellation_message} />
            )}

            <Stack mt='$2'>
              <ModalOptions
                title={`Está seguro que desea eliminar el recorrido?`}
                secondButtonAction={async () => {
                  await deleteTravel(item?.id);
                }}>
                <Button size={'$3'} icon={<Trash2 />} variant='outlined' bg={'$red8'}>
                  <Text color={'$color'}>Eliminar Recorrido</Text>
                </Button>
              </ModalOptions>
            </Stack>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
};
