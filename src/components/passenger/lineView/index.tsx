import React, { useState, useEffect } from 'react';
import { YStack, Text, XStack, Stack, ScrollView } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { BusFront, Search } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';
import { useMapContext } from '@/contexts/map';

import { FormInput } from '@/components/formInput';

import { COLORS } from '@/constants/styles';

export const LineView = () => {
  const navigation = useNavigation();

  const { isDark } = useThemeContext();
  const { changeLine, lines, lineSelected } = useMapContext();

  const [mapLines, setMapLines] = useState([]);
  const [search, setSearch] = useState('');

  const searchLine = (text) => {
    setSearch(text);
    setMapLines(
      text !== ''
        ? lines.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
        : lines
    );
  };

  const selectLine = (line) => {
    changeLine(line);
    navigation.navigate('line' as never);
  };

  useEffect(() => {
    setMapLines(lines);
  }, []);

  return (
    <YStack bg={'$backgroundFocus'} height={300}>
      <XStack pos='relative' p='$2'>
        <FormInput
          placeholder='Búsqueda por linea'
          value={search}
          onChangeText={searchLine}
          w={'100%'}
        />

        <Stack pos='absolute' right='$4' top='$3.5'>
          <Search color={isDark ? COLORS.light : COLORS.dark} size={25} />
        </Stack>
      </XStack>

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
