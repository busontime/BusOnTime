import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Card, XStack, YStack, Button } from 'tamagui';

import { Pencil, Trash2 } from 'lucide-react-native';

import { cooperativeService } from '@/services/cooperative';
import { busService } from '@/services/bus';

import { HeaderList } from '@/components/admin/headerList';
import { CardItem } from '@/components/admin/cardItem';
import { ModalOptions } from '@/components/modalOptions';

import { showSuccessToast } from '@/utils/toast';
import { TogleSidebar } from '@/components/togleSidebar';

export const BusList = () => {
  const navigation = useNavigation();

  const [buses, setBuses] = useState([]);

  const getBuses = async () => {
    try {
      const cooperatives = await cooperativeService.getAll();
      const data = await busService.getAll();

      const _data = data.map((item) => {
        const cooperative = cooperatives.find(
          (cooperative) => cooperative.id === item.cooperativeId
        );

        return { ...item, cooperative: cooperative ? cooperative.name : 'N/A' };
      });

      setBuses(_data);
    } catch (error) {
      console.log('Error al recuperar todos los buses', error);
    }
  };

  const deleteBus = async (id: string) => {
    try {
      await busService.deleteById(id);
      showSuccessToast('Bus Eliminado Exitosamente!');
    } catch (error) {
      console.log(error);
    } finally {
      await getBuses();
    }
  };

  useEffect(() => {
    getBuses();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getBuses();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <YStack f={1}>
      <TogleSidebar />
      <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$3' pos='relative'>
        <HeaderList
          title='Lista de Buses'
          onPress={() => {
            navigation.navigate('bus-form' as never);
          }}
        />

        <ScrollView
          f={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {buses.map((item, index) => (
            <Card key={index} elevate bordered p='$3' size={'$3.5'} w={'$20'} mb='$4'>
              <CardItem label='Nombre:' value={item?.name} />

              <CardItem label='Placa:' value={item?.license_plate} />

              <CardItem label='Cooperativa:' value={item?.cooperative} />

              <XStack jc='flex-end' space='$2' mt='$2'>
                <ModalOptions
                  title={`Está seguro que desea eliminar el bus ${item?.name}?`}
                  secondButtonAction={async () => {
                    await deleteBus(item?.id);
                  }}>
                  <Button size={'$3'} icon={<Trash2 />} variant='outlined' bg={'$red8'} />
                </ModalOptions>

                <Button
                  size={'$3'}
                  icon={<Pencil />}
                  variant='outlined'
                  bg={'$green8'}
                  onPress={() => {
                    navigation.navigate('bus-form', item);
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
