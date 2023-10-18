import React from 'react';
import { YStack } from 'tamagui';

import { TogleSidebar } from '@/components/togleSidebar';
import { Map } from '@/components/map';
import { BusStopView } from '@/components/passenger/busStopView';

export const PassengerHomeScreen = () => {
  return (
    <YStack f={1} bg={'$backgroundFocus'}>
      <TogleSidebar />

      <Map />

      <BusStopView />
    </YStack>
  );
};
