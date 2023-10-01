import React from 'react';
import { Button, Text, XStack } from 'tamagui';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { useThemeContext } from '@/contexts/theme';

export const SidebarItem = ({
  label,
  iconName = 'home',
  onPress = () => {},
  active = false,
  isRed = false,
}) => {
  const { isDark } = useThemeContext();

  return (
    <XStack
      borderLeftColor={active ? '$blue8' : 'transparent'}
      borderLeftWidth={'$1.5'}
      borderRadius={'$2'}>
      <Button
        f={1}
        paddingHorizontal='$2'
        justifyContent='flex-start'
        backgroundColor='transparent'
        onPress={onPress}
        icon={
          <MaterialIcon
            name={iconName}
            size={30}
            color={isRed ? 'red' : isDark ? '#fff' : '#000'}
          />
        }>
        <Text color={isRed ? 'red' : '$gray12'}>{label}</Text>
      </Button>
    </XStack>
  );
};
