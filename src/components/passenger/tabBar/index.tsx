import React from 'react';
import { YStack, Text, XStack } from 'tamagui';

import { BusFront, TrainTrack } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { COLORS } from '@/constants/styles';

export const TabBar = ({ principalTab = true, setPrincipalTab = (value) => {} }) => {
  const { isDark } = useThemeContext();

  return (
    <XStack
      bg={'$backgroundFocus'}
      jc='space-evenly'
      p='$2'
      borderTopColor={'$blue8'}
      borderTopWidth='$0.5'>
      <YStack
        bg={'$colorTransparent'}
        alignItems='center'
        onPress={() => {
          setPrincipalTab(true);
        }}>
        <BusFront
          color={principalTab ? COLORS.secondary : isDark ? COLORS.light : COLORS.dark}
          size={30}
        />

        <Text color={principalTab ? COLORS.secondary : '$color'} fontSize={14}>
          Paradas
        </Text>
      </YStack>

      <YStack
        bg={'$colorTransparent'}
        alignItems='center'
        onPress={() => {
          setPrincipalTab(false);
        }}>
        <TrainTrack
          color={!principalTab ? COLORS.secondary : isDark ? COLORS.light : COLORS.dark}
          size={30}
        />

        <Text color={!principalTab ? COLORS.secondary : '$color'} fontSize={14}>
          Lineas
        </Text>
      </YStack>
    </XStack>
  );
};
