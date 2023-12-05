import React from 'react';
import { XStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { ChevronLeftCircle } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { COLORS } from '@/constants/styles';

export const TogleBack = ({ disableTheme = false }) => {
  const navigation = useNavigation();
  const { isDark } = useThemeContext();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <XStack bg='$colorTransparent' pos='absolute' zi={10} top='$3' left='$3' onPress={goBack}>
      <ChevronLeftCircle
        size={40}
        color={disableTheme ? COLORS.light : isDark ? COLORS.light : COLORS.dark}
      />
    </XStack>
  );
};
