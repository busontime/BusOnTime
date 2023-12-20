import React, { useState } from 'react';
import { YStack } from 'tamagui';

import { TogleSidebar } from '@/components/togleSidebar';
import { Map } from '@/components/map';
import { BusStopView } from '@/components/passenger/busStopView';
import { LineView } from '@/components/passenger/lineView';
import { TabBar } from '@/components/passenger/tabBar';

export const PassengerHomeScreen = () => {
  const [principalTab, setPrincipalTab] = useState(true);

  return (
    <YStack f={1} bg={'$backgroundFocus'}>
      <TogleSidebar disableTheme />

      <Map />

      {principalTab && <BusStopView />}

      {!principalTab && <LineView />}

      <TabBar principalTab={principalTab} setPrincipalTab={setPrincipalTab} />
    </YStack>
  );
};
