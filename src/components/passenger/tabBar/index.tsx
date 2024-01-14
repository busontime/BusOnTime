import React from 'react';
import { YStack, Text, XStack } from 'tamagui';

import { BusFront, TrainTrack } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { COLORS } from '@/constants/styles';

const TABS = [
  {
    tab: true,
    label: 'Paradas',
    Icon: BusFront,
  },
  {
    label: 'Lineas',
    tab: false,
    Icon: TrainTrack,
  },
];

export const TabBar = ({ principalTab = true, setPrincipalTab = (value) => {} }) => {
  const { isDark } = useThemeContext();

  return (
    <XStack
      bg={'$backgroundFocus'}
      jc='space-evenly'
      p='$2'
      borderTopColor={'$blue8'}
      borderTopWidth='$0.5'>
      {TABS.map((item, index) => (
        <YStack
          key={index}
          bg={'$colorTransparent'}
          borderRightColor={'$blue8'}
          borderRightWidth={index === 0 ? '$1' : '$0'}
          w={'50%'}
          alignItems='center'
          onPress={() => {
            setPrincipalTab(item.tab);
          }}>
          <item.Icon
            color={
              principalTab === item.tab ? COLORS.secondary : isDark ? COLORS.light : COLORS.dark
            }
            size={30}
          />

          <Text color={principalTab === item.tab ? COLORS.secondary : '$color'} fontSize={14}>
            {item.label}
          </Text>
        </YStack>
      ))}
    </XStack>
  );
};
