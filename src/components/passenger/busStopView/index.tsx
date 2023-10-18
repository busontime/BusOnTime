import React, { useState } from 'react';
import { YStack, Text, XStack, Stack, ScrollView } from 'tamagui';

import { BusFront, Star } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';
import { useMapContext } from '@/contexts/map';

import { COLORS } from '@/constants/styles';

export const BusStopView = () => {
  const { isDark } = useThemeContext();
  const { changeBusStop, busStopSelected, busStops } = useMapContext();

  const [principalTab, setPrincipalTab] = useState(true);

  const changeTab = () => {
    setPrincipalTab(!principalTab);
  };

  const addBusStopFavorite = (busStop) => {
    console.log('busStop', busStop);
  };

  return (
    <YStack bg={'$backgroundFocus'} height={300}>
      <XStack>
        <Stack
          w={'50%'}
          display='flex'
          jc='center'
          ai='center'
          height={'$4'}
          borderBottomColor={principalTab ? '$blue8' : '$gray8'}
          borderBottomWidth={2}
          onPress={changeTab}>
          <Text color={'$color'} fontWeight={principalTab ? 'bold' : 'normal'}>
            Paradas Cercanas
          </Text>
        </Stack>

        <Stack
          w={'50%'}
          display='flex'
          jc='center'
          ai='center'
          height={'$4'}
          borderBottomColor={!principalTab ? '$blue8' : '$gray8'}
          borderBottomWidth={2}
          onPress={changeTab}>
          <Text color={'$color'} fontWeight={!principalTab ? 'bold' : 'normal'}>
            Paradas Favoritas
          </Text>
        </Stack>
      </XStack>

      {principalTab && (
        <ScrollView>
          <YStack>
            {busStops.map((item, index) => (
              <XStack
                key={index}
                bg={
                  busStopSelected && busStopSelected.name === item.name
                    ? '$gray8'
                    : '$colorTransparent'
                }
                borderBottomColor={'$gray8'}
                borderBottomWidth={'$0.5'}
                ai='center'
                jc='space-between'>
                <XStack
                  space={'$2'}
                  padding={'$3'}
                  ai='center'
                  f={1}
                  onPress={() => changeBusStop(item)}>
                  <BusFront color={isDark ? COLORS.light : COLORS.dark} size={25} />
                  <Text color={'$color'} fontWeight={'$true'}>
                    {item.name}
                  </Text>
                </XStack>

                <XStack
                  bg='$colorTransparent'
                  padding={'$3'}
                  ai='center'
                  onPress={() => {
                    addBusStopFavorite(item);
                  }}>
                  <Star size={25} color={isDark ? COLORS.light : COLORS.dark} />
                </XStack>
              </XStack>
            ))}
          </YStack>
        </ScrollView>
      )}
    </YStack>
  );
};
