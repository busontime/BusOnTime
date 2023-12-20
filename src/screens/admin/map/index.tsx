import React from 'react';
import { YStack } from 'tamagui';

import { TogleSidebar } from '@/components/togleSidebar';
import { Map } from '@/components/map';

export const AdminMapScreen = () => {
  return (
    <YStack f={1} bg={'$backgroundFocus'}>
      <TogleSidebar disableTheme />

      <Map />
    </YStack>
  );
};
