import React from 'react';
import { XStack, Circle } from 'tamagui';

import { Sun, Moon } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { COLORS } from '@/constants/styles';

export const TogleTheme = () => {
  const { changeTheme, isDark } = useThemeContext();

  return (
    <XStack
      jc={isDark ? 'flex-end' : 'flex-start'}
      bg='$gray8'
      borderRadius={'$10'}
      borderWidth={'$0.5'}
      borderColor={'$gray11'}
      padding={'$0.5'}
      w={'$5'}
      onPress={changeTheme}>
      <Circle bg={isDark ? COLORS.dark : COLORS.light} p='$1.5'>
        {isDark && <Moon size={16} color={COLORS.light} />}
        {!isDark && <Sun size={16} color={COLORS.dark} />}
      </Circle>
    </XStack>
  );
};
