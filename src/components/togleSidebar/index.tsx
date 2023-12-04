import React from 'react';
import { XStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { Menu } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { COLORS } from '@/constants/styles';

export const TogleSidebar = ({ disableTheme = false }) => {
  const navigation = useNavigation();
  const { isDark } = useThemeContext();

  const openDrawer = () => navigation.toggleDrawer();

  return (
    <XStack bg='$colorTransparent' pos='absolute' zi={10} w={'$3.5'} m='$2.5' onPress={openDrawer}>
      <Menu size={40} color={disableTheme ? COLORS.light : isDark ? COLORS.light : COLORS.dark} />
    </XStack>
  );
};
