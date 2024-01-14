import React, { useState } from 'react';
import { YStack, Text, XStack, Stack } from 'tamagui';

import { useMapContext } from '@/contexts/map';
import { useAuthContext } from '@/contexts/auth';

import { BusStopList } from '../busStopList';

const TABS = [
  {
    tab: true,
    label: 'Paradas Cercanas',
  },
  {
    tab: false,
    label: 'Paradas Favoritas',
  },
];

export const BusStopTab = () => {
  const { busStops } = useMapContext();
  const { profile } = useAuthContext();
  const { person } = profile;

  const [principalTab, setPrincipalTab] = useState(true);

  return (
    <YStack bg={'$backgroundFocus'} height={300}>
      <XStack>
        {TABS.map((item, index) => (
          <Stack
            key={index}
            w={'50%'}
            display='flex'
            jc='center'
            ai='center'
            height={'$4'}
            borderBottomColor={principalTab === item.tab ? '$blue8' : '$gray8'}
            borderBottomWidth={2}
            onPress={() => {
              setPrincipalTab(item.tab);
            }}>
            <Text color={'$color'} fontWeight={principalTab === item.tab ? 'bold' : 'normal'}>
              {item.label}
            </Text>
          </Stack>
        ))}
      </XStack>

      <BusStopList data={principalTab ? busStops : person?.busStops} principalTab={principalTab} />
    </YStack>
  );
};
