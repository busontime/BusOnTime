import React from 'react';
import { Button, YStack, H3 } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import {
  BusFront,
  User,
  Bus,
  TrainTrack,
  Building2,
  ArrowLeftRight,
  Map,
} from 'lucide-react-native';

import { useAuthContext } from '@/contexts/auth';
import { TogleSidebar } from '@/components/togleSidebar';

export const AdminHomeScreen = () => {
  const navigation = useNavigation();
  const { profile } = useAuthContext();

  return (
    <YStack f={1}>
      <TogleSidebar />

      <YStack bg={'$backgroundFocus'} f={1} jc='center' ai='center' space='$5'>
        <H3 ta='center' color={'$color'}>
          Bienvenido {profile?.person?.name}
        </H3>

        <Button
          w={'$15'}
          size={'$5'}
          icon={<Map size={40} />}
          variant='outlined'
          backgroundColor='$blue6'
          onPress={() => {
            navigation.navigate('map-menu' as never);
          }}>
          Mapa
        </Button>

        <Button
          w={'$15'}
          size={'$5'}
          icon={<ArrowLeftRight size={40} />}
          variant='outlined'
          backgroundColor='$blue8'
          onPress={() => {
            navigation.navigate('travel-menu' as never);
          }}>
          Recorridos
        </Button>

        <Button
          w={'$15'}
          size={'$5'}
          icon={<Building2 size={40} />}
          variant='outlined'
          backgroundColor='$blue6'
          onPress={() => {
            navigation.navigate('cooperative-menu' as never);
          }}>
          Cooperativas
        </Button>

        <Button
          w={'$15'}
          size={'$5'}
          icon={<User size={40} />}
          variant='outlined'
          backgroundColor='$blue8'
          onPress={() => {
            navigation.navigate('driver-menu' as never);
          }}>
          Conductores
        </Button>

        <Button
          w={'$15'}
          size={'$5'}
          icon={<Bus size={40} />}
          variant='outlined'
          backgroundColor='$blue6'
          onPress={() => {
            navigation.navigate('bus-menu' as never);
          }}>
          Buses
        </Button>

        <Button
          w={'$15'}
          size={'$5'}
          icon={<TrainTrack size={40} />}
          variant='outlined'
          backgroundColor='$blue8'
          onPress={() => {
            navigation.navigate('line-menu' as never);
          }}>
          Lineas
        </Button>

        <Button
          w={'$15'}
          size={'$5'}
          icon={<BusFront size={40} />}
          variant='outlined'
          backgroundColor='$blue6'
          onPress={() => {
            navigation.navigate('bus-stop-menu' as never);
          }}>
          Paradas
        </Button>
      </YStack>
    </YStack>
  );
};
