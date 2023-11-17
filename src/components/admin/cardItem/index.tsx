import React from 'react';
import { XStack, Text } from 'tamagui';

export const CardItem = ({ label = '', value = '', color = '$color' }) => {
  return (
    <XStack space='$2'>
      <Text color={'$color'} fontWeight={'$true'}>
        {label}
      </Text>
      <Text color={color} fontStyle='italic'>
        {value}
      </Text>
    </XStack>
  );
};
