import React, { useState, useEffect } from 'react';
import { YStack, Text, XStack, Stack, ScrollView } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { BusFront } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';
import { useMapContext } from '@/contexts/map';

import { COLORS } from '@/constants/styles';

export const LineView = ({ searchValue = '' }) => {
  const navigation = useNavigation();

  const { isDark } = useThemeContext();
  const { changeLine, lines, lineSelected } = useMapContext();

  const [mapLines, setMapLines] = useState([]);

  const selectLine = (line) => {
    changeLine(line);
    navigation.navigate('line' as never);
  };

  const searchLine = () => {
    setMapLines(
      searchValue !== ''
        ? lines.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        : lines
    );
  };

  useEffect(() => {
    searchLine();
  }, [searchValue, lines]);

  return (
    <YStack bg={'$backgroundFocus'} f={1}>
      <ScrollView>
        {mapLines.map((item, index) => (
          <XStack
            key={index}
            bg={lineSelected && lineSelected.name === item.name ? '$gray8' : '$colorTransparent'}
            borderBottomColor={'$gray8'}
            borderBottomWidth={'$0.5'}
            ai='center'
            space={'$2'}
            padding={'$2.5'}
            f={1}
            onPress={() => {
              selectLine(item);
            }}>
            <Stack borderBottomWidth='$1' borderBottomColor={item?.lineColor} paddingBottom='$1'>
              <BusFront color={isDark ? COLORS.light : COLORS.dark} size={25} />
            </Stack>

            <Text color={'$color'} fontWeight={'$true'}>
              {item.name}
            </Text>
          </XStack>
        ))}
      </ScrollView>
    </YStack>
  );
};
