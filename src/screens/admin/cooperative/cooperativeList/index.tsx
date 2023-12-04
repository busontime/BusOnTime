import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, ScrollView, XStack, YStack } from 'tamagui';

import { Pencil, Trash2 } from 'lucide-react-native';

import { useLoader } from '@/contexts/loader';

import { cooperativeService } from '@/services/cooperative';

import { TogleSidebar } from '@/components/togleSidebar';
import { HeaderList } from '@/components/admin/headerList';
import { CardItem } from '@/components/admin/cardItem';
import { ModalOptions } from '@/components/modalOptions';

import { showSuccessToast } from '@/utils/toast';
import { convertFirestoreDateToDate, convertFirestoreDateToString } from '@/utils/helpers';

export const CooperativeList = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();

  const [cooperatives, setCooperatives] = useState([]);

  const getCooperatives = async () => {
    showLoader();

    try {
      const data = await cooperativeService.getAll();

      const _data = data.map((item) => ({
        ...item,
        displayDate: convertFirestoreDateToString(item.date_foundation),
        date_foundation: convertFirestoreDateToDate(item.date_foundation),
      }));

      setCooperatives(_data);
    } catch (error) {
      console.log('Error al recuperar todas las cooperativas', error);
    } finally {
      hideLoader();
    }
  };

  const deleteCooperative = async (id: string) => {
    showLoader();

    try {
      await cooperativeService.deleteById(id);
      showSuccessToast('Cooperativa Eliminada Exitosamente!');
    } catch (error) {
      console.log(error);
    } finally {
      await getCooperatives();
      hideLoader();
    }
  };

  useEffect(() => {
    getCooperatives();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getCooperatives();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <YStack f={1}>
      <TogleSidebar />

      <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$3' pos='relative'>
        <HeaderList
          title='Lista de Cooperativas'
          onPress={() => {
            navigation.navigate('create-cooperative' as never);
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
            <Card key={index} elevate bordered p='$3' size={'$3.5'} w={'$20'} mb='$4'>
              <CardItem label='Nombre:' value={item?.name} />

              <CardItem label='Alias:' value={item?.alias} />

              <CardItem label='Fecha de fundación:' value={item?.displayDate} />

              <XStack jc='flex-end' space='$2' mt='$2'>
                <ModalOptions
                  title={`Está seguro que desea eliminar la Cooperativa ${item?.name}?`}
                  secondButtonAction={async () => {
                    await deleteCooperative(item?.id);
                  }}>
                  <Button size={'$3'} icon={<Trash2 />} variant='outlined' bg={'$red8'} />
                </ModalOptions>

                <Button
                  size={'$3'}
                  icon={<Pencil />}
                  variant='outlined'
                  bg={'$green8'}
                  onPress={() => {
                    navigation.navigate('update-cooperative', item);
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
