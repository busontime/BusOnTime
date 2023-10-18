import React from 'react';
import { XStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { Menu } from 'lucide-react-native';

import { COLORS } from '@/constants/styles';

export const TogleSidebar = () => {
  const navigation = useNavigation();

  const openDrawer = () => navigation.toggleDrawer();

  return (
    <XStack bg='$colorTransparent' pos='absolute' zi={10} w={'$3.5'} m='$1.5' onPress={openDrawer}>
      <Menu size={40} color={COLORS.dark} />
    </XStack>
  );
};
