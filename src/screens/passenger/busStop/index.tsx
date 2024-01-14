import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { YStack, XStack, Stack, ScrollView, Text } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { Search, X, BusFront } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';
import { useMapContext } from '@/contexts/map';

import { TogleBack } from '@/components/togleBack';
import { FormInput } from '@/components/formInput';

import { COLORS } from '@/constants/styles';

export const PassengerBusStopScreen = () => {
  const { busStops, setCurrentLocation } = useMapContext();
  const { isDark } = useThemeContext();
  const { goBack } = useNavigation();

  const [search, setSearch] = useState('');
  const [busStopsSearch, setBusStopsSearch] = useState([]);

  const selectBusStop = (item) => {
    setCurrentLocation(item?.coordinate);
    goBack();
  };

  const updateBusStops = (text) => {
    if (text !== '') {
      const data = busStops.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
      setBusStopsSearch(data);
    } else {
      setBusStopsSearch([]);
    }
  };

  useEffect(() => {
    updateBusStops(search);
  }, [search]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack f={1} bg={'$backgroundFocus'} p='$2.5'>
          <TogleBack />

          <XStack marginLeft='$9'>
            <FormInput
              placeholder='Búsqueda de paradas'
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
              w={'100%'}
            />

            <Stack
              pos='absolute'
              right='$3'
              top='$2.5'
              bg={'$colorTransparent'}
              onPress={() => {
                setSearch('');
              }}>
              {search === '' ? (
                <Search color={isDark ? COLORS.light : COLORS.dark} size={25} />
              ) : (
                <X color={isDark ? COLORS.light : COLORS.dark} size={25} />
              )}
            </Stack>
          </XStack>

          <ScrollView marginVertical='$3'>
            {busStopsSearch.map((item, index) => (
              <XStack
                key={index}
                bg={'$colorTransparent'}
                borderBottomColor={'$gray8'}
                borderBottomWidth={'$0.5'}
                ai='center'
                space={'$3'}
                padding={'$3'}
                f={1}
                onPress={() => {
                  selectBusStop(item);
                }}>
                <BusFront color={COLORS.secondary} size={30} />

                <Text color={'$color'} fontWeight={'$true'}>
                  {item?.name}
                </Text>
              </XStack>
            ))}
          </ScrollView>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
