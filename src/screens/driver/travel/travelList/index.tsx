import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Card, YStack, Button, Text } from 'tamagui';

import { MapPin } from 'lucide-react-native';

import { useAuthContext } from '@/contexts/auth';
import { useLoader } from '@/contexts/loader';

import { travelService } from '@/services/travel';

import { TogleSidebar } from '@/components/togleSidebar';
import { HeaderList } from '@/components/admin/headerList';
import { CardItem } from '@/components/admin/cardItem';

import { convertFirestoreDateToString, getTravelStatus } from '@/utils/helpers';

export const TravelList = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();
  const { profile } = useAuthContext();
  const { user } = profile;

  const [travels, setTravels] = useState([]);

  const getTravels = async () => {
    showLoader();

    try {
      const data = await travelService.getAllByDriverId(user.uid);

      setTravels(data);
    } catch (error) {
      console.log('Error al recuperar todos los recorridos', error);
    } finally {
      hideLoader();
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
      <TogleSidebar />

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

            <CardItem label='Hora de Inicio:' value={item?.startTime} />

            <CardItem label='Hora de Fin:' value={item?.endTime} />

            <CardItem label='Linea:' value={item?.line?.name} />

            <CardItem label='Cooperativa:' value={item?.cooperative?.name} />

            <CardItem label='Bus:' value={item?.bus?.name} />

            <CardItem
              label='Estado:'
              value={getTravelStatus(item?.state).label}
              color={getTravelStatus(item?.state).color}
            />

            {item.cancellation_message && (
              <CardItem label='Motivo de cancelación' value={item?.cancellation_message} />
            )}

            <Button
              mt='$2'
              size={'$3'}
              icon={<MapPin />}
              variant='outlined'
              bg={'$green8'}
              onPress={() => {
                navigation.navigate('travel-route-map', item);
              }}>
              <Text color={'$color'}>Ver Recorrido</Text>
            </Button>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
};
