import React from 'react';
import { YStack, Text, XStack, Stack, ScrollView, H4 } from 'tamagui';

import { useMapContext } from '@/contexts/map';

export const LineSelectedView = () => {
  const { lineSelected } = useMapContext();

  return (
    <YStack bg={'$backgroundFocus'} height={300} space='$2' paddingVertical='$2'>
      <H4 color={'$color'} ta='center'>
        {lineSelected?.name}
      </H4>

      <XStack jc='space-evenly'>
        <XStack space='$1.5'>
          <Text color={'$color'} fontWeight={'bold'}>
            Origen:
          </Text>

          <Text color={'$color'}>{lineSelected?.origin?.name}</Text>
        </XStack>

        <XStack space='$1.5'>
          <Text color={'$color'} fontWeight={'bold'}>
            Destino:
          </Text>

          <Text color={'$color'}>{lineSelected?.destination?.name}</Text>
        </XStack>
      </XStack>

      <ScrollView>
        {lineSelected?.stops.map((item, index) => (
          <XStack key={index} ai='center' paddingHorizontal='$5'>
            <YStack marginRight='$5' ai='center'>
              <Stack
                bg={index !== 0 ? lineSelected?.lineColor : '$colorTransparent'}
                h={12}
                w={'$0.5'}
              />

              <Stack bg={lineSelected?.lineColor} borderRadius={'$12'} w={12} h={12} />

              <Stack
                bg={
                  index !== lineSelected?.stops.length - 1
                    ? lineSelected?.lineColor
                    : '$colorTransparent'
                }
                h={12}
                w={'$0.5'}
              />
            </YStack>

            <Text color={'$color'}>{item?.name}</Text>
          </XStack>
        ))}
      </ScrollView>
    </YStack>
  );
};
