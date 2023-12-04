import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, ScrollView, XStack, YStack, H5, Stack } from 'tamagui';

import { Pencil, Trash2 } from 'lucide-react-native';

import { useLoader } from '@/contexts/loader';

import { lineService } from '@/services/line';

import { TogleSidebar } from '@/components/togleSidebar';
import { HeaderList } from '@/components/admin/headerList';
import { CardItem } from '@/components/admin/cardItem';
import { ModalOptions } from '@/components/modalOptions';

import { showSuccessToast } from '@/utils/toast';

export const LineList = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();

  const [lines, setLines] = useState([]);

  const getLines = async () => {
    showLoader();

    try {
      const data = await lineService.getAll();
      setLines(data);
    } catch (error) {
      console.log('Error al recuperar todas las lineas', error);
    } finally {
      hideLoader();
    }
  };

  const deleteLine = async (id) => {
    showLoader();

    try {
      await lineService.deleteById(id);
      showSuccessToast('Linea Eliminada Exitosamente!');
    } catch (error) {
      console.log(error);
    } finally {
      await getLines();
      hideLoader();
    }
  };

  useEffect(() => {
    getLines();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getLines();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <YStack f={1}>
      <TogleSidebar />

      <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$3' pos='relative'>
        <HeaderList
          title='Lista de Lineas'
          onPress={() => {
            navigation.navigate('line-form' as never);
          }}
        />

        <ScrollView
          f={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {lines.map((item, index) => (
            <Card key={index} elevate bordered p='$3' size={'$3.5'} w={'$20'} mb='$4'>
              <CardItem label='Nombre:' value={item?.name} />

              <XStack space='$3'>
                <CardItem label='Color:' color={item?.lineColor} value={item?.lineColor} />
                <Stack bg={item?.lineColor} height={'$1'} width={'$1'} borderRadius={'$1'} />
              </XStack>

              <CardItem label='Origen:' value={item.origin?.name} />

              <CardItem label='Destino:' value={item.destination?.name} />

              <H5 textAlign='center' marginVertical='$1' textTransform='capitalize'>
                Paradas
              </H5>

              {item?.stops?.map((stop, index) => (
                <CardItem key={index} label='-' value={stop?.name} />
              ))}

              <XStack jc='flex-end' space='$2' mt='$2'>
                <ModalOptions
                  title={`Está seguro que desea eliminar la linea ${item?.name}?`}
                  secondButtonAction={async () => {
                    await deleteLine(item?.id);
                  }}>
                  <Button size={'$3'} icon={<Trash2 />} variant='outlined' bg={'$red8'} />
                </ModalOptions>

                <Button
                  size={'$3'}
                  icon={<Pencil />}
                  variant='outlined'
                  bg={'$green8'}
                  onPress={() => {
                    navigation.navigate('line-form', item);
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
