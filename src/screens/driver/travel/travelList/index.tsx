import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Card, YStack } from 'tamagui';

import { travelService } from '@/services/travel';

import { HeaderList } from '@/components/admin/headerList';
import { CardItem } from '@/components/admin/cardItem';

import { convertFirestoreDateToString } from '@/utils/helpers';

import { TRAVEL_STATUS } from '@/constants/bd';
import { COLORS } from '@/constants/styles';

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

  const getStatusLabel = (status) => {
    switch (status) {
      case TRAVEL_STATUS.active:
        return { label: 'Activo', color: COLORS.green };
        break;

      case TRAVEL_STATUS.finalized:
        return { label: 'Finalizado', color: COLORS.secondary };
        break;

      case TRAVEL_STATUS.cancelled:
        return { label: 'Cancelado', color: COLORS.red };
        break;

      default:
        return { label: '', color: COLORS.light };
        break;
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
    <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$3' pos='relative'>
      <HeaderList
        title='Historial de Recorridos'
        buttonText='Atrás'
        onPress={() => {
          navigation.navigate('travel-form' as never);
        }}
      />

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
            <CardItem label='Fecha:' value={convertFirestoreDateToString(item?.date)} />

            <CardItem label='Hora de Salida:' value={item?.startTime} />

            <CardItem label='Hora de Llegada:' value={item?.endTime} />

            <CardItem label='Linea:' value={item?.line?.name} />

            <CardItem label='Bus:' value={item?.bus?.name} />

            <CardItem
              label='Estado:'
              value={getStatusLabel(item?.state).label}
              color={getStatusLabel(item?.state).color}
            />
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
};
