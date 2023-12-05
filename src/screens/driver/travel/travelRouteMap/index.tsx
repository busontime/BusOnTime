import React from 'react';
import { useRoute } from '@react-navigation/native';
import { YStack } from 'tamagui';

import { TogleBack } from '@/components/togleBack';
import { MapTravel } from '@/components/mapTravel';

export const TravelRouteMap = () => {
  const route = useRoute();
  const travel = route.params;

  return (
    <YStack f={1} bg={'$backgroundFocus'}>
      <TogleBack disableTheme />

      <MapTravel travel={travel} />
    </YStack>
  );
};
