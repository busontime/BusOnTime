import React from 'react';
import { XStack, Stack } from 'tamagui';

import { CarFront, Footprints } from 'lucide-react-native';

import { COLORS } from '@/constants/styles';

export const MapSelectDirecction = ({ directionMode = '', setDirectionMode }) => {
  return (
    <XStack pos='absolute' top={'$2.5'} right={'$2'} space='$2'>
      <Stack
        bg={directionMode === 'DRIVING' ? '$blue8' : '$colorTransparent'}
        borderRadius={'$5'}
        padding='$1.5'
        onPress={() => {
          setDirectionMode('DRIVING');
        }}>
        <CarFront color={COLORS.light} size={30} />
      </Stack>

      <Stack
        bg={directionMode === 'WALKING' ? '$blue8' : '$colorTransparent'}
        padding='$1.5'
        borderRadius={'$5'}
        onPress={() => {
          setDirectionMode('WALKING');
        }}>
        <Footprints color={COLORS.light} size={30} />
      </Stack>
    </XStack>
  );
};
