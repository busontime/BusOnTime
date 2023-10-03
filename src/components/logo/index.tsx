import React from 'react';
import { Circle } from 'tamagui';

import { Bus } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { COLORS } from '@/constants/styles';

export const Logo = () => {
  const { isDark } = useThemeContext();

  return (
    <Circle bg={isDark ? '$blue8' : COLORS.light} p='$2.5'>
      <Bus color={isDark ? COLORS.dark : COLORS.secondary} size={60} absoluteStrokeWidth />
    </Circle>
  );
};
