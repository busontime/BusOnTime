import React from 'react';
import { ToggleGroup, XStack, Text } from 'tamagui';

import { useThemeContext } from '@/contexts/theme';

import { COLORS } from '@/constants/styles';

export const FormGroup = ({
  value = [],
  onValueChange = (val) => {},
  options = [],
  w = '$20',
  icon = null,
}) => {
  const { isDark } = useThemeContext();

  return (
    <ToggleGroup
      orientation={'vertical'}
      type={'multiple'}
      w={w}
      value={value}
      onValueChange={onValueChange}>
      {options.map((item, index) => (
        <ToggleGroup.Item key={index} value={item.id} w={w}>
          <XStack paddingVertical='$1.5' paddingHorizontal='$5' space='$3' w={w}>
            {icon && icon}
            <Text color={isDark ? COLORS.light : COLORS.dark}>{item?.name}</Text>
          </XStack>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
};
