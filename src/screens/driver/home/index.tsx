import React from 'react';
import { Button, YStack, H3, Text } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { BusIcon } from 'lucide-react-native';

import { TogleSidebar } from '@/components/togleSidebar';
import { Logo } from '@/components/logo';

export const DriverHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <YStack f={1}>
      <TogleSidebar />

      <YStack bg={'$backgroundFocus'} f={1} jc='center' ai='center' space='$6'>
        <Logo />

        <YStack jc='center' ai='center'>
          <H3 ta='center' color={'$color'}>
            ¡Bienvenido a Bus On Time!
          </H3>

          <Text color={'$color'}>La App que gestiona el transporte público de Manta</Text>
        </YStack>

        <YStack jc='center' ai='center' space='$3'>
          <Text color={'$color'}>Inicia tu recorrido cuando estés listo.</Text>

          <Button
            w={'$20'}
            size={'$5'}
            icon={<BusIcon size={40} strokeWidth={1} />}
            variant='outlined'
            backgroundColor='$blue8'
            onPress={() => {
              navigation.navigate('travel-menu' as never);
            }}>
            Iniciar Recorrido
          </Button>
        </YStack>
      </YStack>
    </YStack>
  );
};
