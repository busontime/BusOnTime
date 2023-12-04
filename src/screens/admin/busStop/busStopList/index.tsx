import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, H5, ScrollView, XStack, YStack } from 'tamagui';

import { Pencil, Trash2 } from 'lucide-react-native';

import { useLoader } from '@/contexts/loader';

import { busStopService } from '@/services/busStop';

import { TogleSidebar } from '@/components/togleSidebar';
import { HeaderList } from '@/components/admin/headerList';
import { CardItem } from '@/components/admin/cardItem';
import { ModalOptions } from '@/components/modalOptions';

import { showSuccessToast } from '@/utils/toast';

export const BusStopList = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();

  const [busStops, setBusStops] = useState([]);

  const getData = async () => {
    showLoader();

    try {
      const data = await busStopService.getAll();
      setBusStops(data);
    } catch (error) {
      console.log('Error al recuperar todas las paradas de buses', error);
    } finally {
      hideLoader();
    }
  };

  const deleteBusStop = async (id: string) => {
    showLoader();

    try {
      await busStopService.deleteById(id);
      showSuccessToast('Parada Eliminada Exitosamente!');
    } catch (error) {
      console.log(error);
    } finally {
      await getData();
      hideLoader();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <YStack f={1}>
      <TogleSidebar />

      <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$3' pos='relative'>
        <HeaderList
          title='Lista de Paradas'
          onPress={() => {
            navigation.navigate('bus-stop-form' as never);
          }}
        />

        <ScrollView
          f={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {busStops.map((item, index) => (
            <Card key={index} elevate bordered p='$3' size={'$3.5'} w={'$20'} mb='$4'>
              <CardItem label='Nombre:' value={item?.name} />

              <H5 textAlign='center' marginVertical='$1' textTransform='capitalize'>
                Coordenadas
              </H5>

              <CardItem label='Latitud:' value={item?.coordinate?.latitude} />

              <CardItem label='Longitud:' value={item?.coordinate?.longitude} />

              <XStack jc='flex-end' space='$2' mt='$2'>
                <ModalOptions
                  title={`Está seguro que desea eliminar la parada ${item?.name}?`}
                  secondButtonAction={async () => {
                    await deleteBusStop(item?.id);
                  }}>
                  <Button size={'$3'} icon={<Trash2 />} variant='outlined' bg={'$red8'} />
                </ModalOptions>

                <Button
                  size={'$3'}
                  icon={<Pencil />}
                  variant='outlined'
                  bg={'$green8'}
                  onPress={() => {
                    navigation.navigate('bus-stop-form', item);
                  }}
                />
              </XStack>
            </Card>
          ))}
        </ScrollView>
      </YStack>
    </YStack>
  );
};
