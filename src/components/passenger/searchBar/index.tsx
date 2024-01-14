import React, { useState } from 'react';
import { XStack, Stack } from 'tamagui';

import { Search } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { TogleSidebar } from '@/components/togleSidebar';
import { FormInput } from '@/components/formInput';

import { COLORS } from '@/constants/styles';

export const SearchBar = ({ changeSearchValue = (text) => {}, onPress = () => {} }) => {
  const { isDark } = useThemeContext();

  const [search, setSearch] = useState('');

  const searchLine = (text) => {
    setSearch(text);
    changeSearchValue(text);
  };

  return (
    <XStack bg={'$backgroundFocus'} p='$2'>
      <TogleSidebar />

      <XStack marginLeft='$9'>
        <FormInput
          placeholder='Búsqueda...'
          value={search}
          onChangeText={searchLine}
          w={'100%'}
          onPress={onPress}
        />

        <Stack pos='absolute' right='$3' top='$2.5'>
          <Search color={isDark ? COLORS.light : COLORS.dark} size={25} />
        </Stack>
      </XStack>
    </XStack>
  );
};
