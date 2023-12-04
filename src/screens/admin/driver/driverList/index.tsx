import React, { useState, useEffect } from 'react';
import { ScrollView, Card, YStack, XStack, Button } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { Pencil, Trash2 } from 'lucide-react-native';

import { useLoader } from '@/contexts/loader';

import { cooperativeService } from '@/services/cooperative';
import { userService } from '@/services/user';

import { TogleSidebar } from '@/components/togleSidebar';
import { HeaderList } from '@/components/admin/headerList';
import { CardItem } from '@/components/admin/cardItem';
import { ModalOptions } from '@/components/modalOptions';

import { showSuccessToast } from '@/utils/toast';
import { convertFirestoreDateToDate, convertFirestoreDateToString } from '@/utils/helpers';

export const DriverList = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();

  const [drivers, setDrivers] = useState([]);

  const getDrivers = async () => {
    showLoader();

    try {
      const cooperatives = await cooperativeService.getAll();
      const data = await userService.getAllDrivers();

      const _data = data.map((item) => {
        const cooperative = cooperatives.find(
          (cooperative) => cooperative.id === item.cooperativeId
        );

        return {
          ...item,
          displayDate: convertFirestoreDateToString(item.birthdate),
          birthdate: convertFirestoreDateToDate(item.birthdate),
          cooperative: cooperative ? cooperative.name : 'N/A',
        };
      });

      setDrivers(_data);
    } catch (error) {
      console.log('Error al recuperar todos los conductores', error);
    } finally {
      hideLoader();
    }
  };

  const deleteDriver = async (id: string) => {
    showLoader();

    try {
      await userService.deleteById(id);
      showSuccessToast('Conductor Eliminado Exitosamente!');
    } catch (error) {
      console.log(error);
    } finally {
      await getDrivers();
      hideLoader();
    }
  };

  useEffect(() => {
    getDrivers();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getDrivers();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <YStack f={1}>
      <TogleSidebar />

      <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$3' pos='relative'>
        <HeaderList
          title='Lista de Conductores'
          onPress={() => {
            navigation.navigate('driver-form' as never);
          }}
        />

        <ScrollView
          f={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {drivers.map((item, index) => (
            <Card key={index} elevate bordered p='$3' size={'$3.5'} w={'$20'} mb='$4'>
              <CardItem label='Nombre:' value={item?.name + ' ' + item?.lastname} />

              <CardItem label='Email:' value={item?.email} />

              <CardItem label='Teléfono:' value={item?.phone} />

              <CardItem label='Cédula:' value={item?.ci} />

              <CardItem label='Fecha de nacimiento:' value={item?.displayDate} />

              <CardItem label='Cooperativa:' value={item?.cooperative} />

              <XStack jc='flex-end' space='$2' mt='$2'>
                <ModalOptions
                  title={`Está seguro que desea eliminar al conductor ${
                    item?.name + ' ' + item?.lastname
                  }?`}
                  secondButtonAction={async () => {
                    await deleteDriver(item?.id);
                  }}>
                  <Button size={'$3'} icon={<Trash2 />} variant='outlined' bg={'$red8'} />
                </ModalOptions>

                <Button
                  size={'$3'}
                  icon={<Pencil />}
                  variant='outlined'
                  bg={'$green8'}
                  onPress={() => {
                    navigation.navigate('driver-form', item);
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
