import React, { useState, useEffect } from 'react';
import { YStack, Text, XStack, Stack, ScrollView } from 'tamagui';

import { BusFront, Star, StarOff, Sparkles } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';
import { useMapContext } from '@/contexts/map';
import { useAuthContext } from '@/contexts/auth';
import { useLoader } from '@/contexts/loader';

import { userService } from '@/services/user';

import { showAlertDialog } from '@/utils/dialog';
import { showSuccessToast } from '@/utils/toast';

import { COLORS } from '@/constants/styles';

export const BusStopView = ({ searchValue = '' }) => {
  const { isDark } = useThemeContext();
  const { changeBusStop, busStopSelected, busStops, lines } = useMapContext();
  const { showLoader, hideLoader } = useLoader();
  const { profile, updateProfile } = useAuthContext();
  const { user, person } = profile;

  const [principalTab, setPrincipalTab] = useState(true);
  const [busStopsSelected, setBusStopsSelected] = useState([]);

  const addBusStopFavorite = async (busStop) => {
    if (isBusStopFavorite(busStop)) {
      return;
    }

    showLoader();

    try {
      const busStops = person?.busStops ?? [];

      busStops.push(busStop);

      await userService.updateById(user?.uid, { busStops });

      await updateProfile();

      showSuccessToast('Parada favorita agregada exitósamente!');
    } catch (error) {
      console.log('error al  actualizar', error);
      showAlertDialog('Error al agregar, Inténtelo más tarde');
    } finally {
      hideLoader();
    }
  };

  const removeBusStopFavorite = async (busStop) => {
    showLoader();

    try {
      let busStops = person?.busStops ?? [];

      busStops = busStops.filter((item) => item.id !== busStop.id);

      await userService.updateById(user?.uid, { busStops });

      await updateProfile();

      showSuccessToast('Parada favorita elimada exitósamente!');
    } catch (error) {
      console.log('error al  actualizar', error);
      showAlertDialog('Error al eliminar, Inténtelo más tarde');
    } finally {
      hideLoader();
    }
  };

  const isBusStopFavorite = (busStop) => {
    return person?.busStops?.some((item) => item.id === busStop.id);
  };

  const getLinesByBusStopId = (id) => {
    const data = lines?.filter(
      (item) =>
        item.stops.some((stop) => stop.id === id) ||
        item?.destination.id === id ||
        item?.origin.id === id
    );

    return data ?? [];
  };

  const updateBusStops = (text) => {
    if (text !== '') {
      const data = busStops.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
      setBusStopsSelected(data);
    } else {
      setBusStopsSelected(busStops);
    }
  };

  useEffect(() => {
    updateBusStops(searchValue);
  }, [searchValue, busStops]);

  return (
    <YStack bg={'$backgroundFocus'} height={300}>
      <XStack>
        <Stack
          w={'50%'}
          display='flex'
          jc='center'
          ai='center'
          height={'$4'}
          borderBottomColor={principalTab ? '$blue8' : '$gray8'}
          borderBottomWidth={2}
          onPress={() => {
            setPrincipalTab(true);
          }}>
          <Text color={'$color'} fontWeight={principalTab ? 'bold' : 'normal'}>
            Paradas Cercanas
          </Text>
        </Stack>

        <Stack
          w={'50%'}
          display='flex'
          jc='center'
          ai='center'
          height={'$4'}
          borderBottomColor={!principalTab ? '$blue8' : '$gray8'}
          borderBottomWidth={2}
          onPress={() => {
            setPrincipalTab(false);
          }}>
          <Text color={'$color'} fontWeight={!principalTab ? 'bold' : 'normal'}>
            Paradas Favoritas
          </Text>
        </Stack>
      </XStack>

      {principalTab && (
        <ScrollView>
          {busStopsSelected.map((item, index) => (
            <XStack
              key={index}
              bg={
                busStopSelected && busStopSelected.name === item.name
                  ? '$gray8'
                  : '$colorTransparent'
              }
              borderBottomColor={'$gray8'}
              borderBottomWidth={'$0.5'}
              ai='center'
              jc='space-between'>
              <XStack
                space={'$2'}
                padding={'$3'}
                ai='center'
                f={1}
                onPress={() => changeBusStop(item)}>
                <BusFront color={isDark ? COLORS.light : COLORS.dark} size={25} />
                <Text color={'$color'} fontWeight={'$true'}>
                  {item.name}
                </Text>
              </XStack>

              {busStopSelected && busStopSelected.name === item.name && (
                <YStack f={1}>
                  {getLinesByBusStopId(item.id).map((line, idx) => (
                    <Text key={idx} color={line?.lineColor}>
                      - {line.name}
                    </Text>
                  ))}
                </YStack>
              )}

              <XStack
                bg='$colorTransparent'
                padding={'$3'}
                ai='center'
                onPress={() => {
                  addBusStopFavorite(item);
                }}>
                {isBusStopFavorite(item) ? (
                  <Sparkles size={25} color={isDark ? COLORS.light : COLORS.dark} />
                ) : (
                  <Star size={25} color={isDark ? COLORS.light : COLORS.dark} />
                )}
              </XStack>
            </XStack>
          ))}
        </ScrollView>
      )}

      {!principalTab && (
        <ScrollView>
          {person?.busStops?.map((item, index) => (
            <XStack
              key={index}
              bg={
                busStopSelected && busStopSelected.name === item.name
                  ? '$gray8'
                  : '$colorTransparent'
              }
              borderBottomColor={'$gray8'}
              borderBottomWidth={'$0.5'}
              ai='center'
              jc='space-between'>
              <XStack
                space={'$2'}
                padding={'$3'}
                ai='center'
                f={1}
                onPress={() => changeBusStop(item)}>
                <BusFront color={isDark ? COLORS.light : COLORS.dark} size={25} />
                <Text color={'$color'} fontWeight={'$true'}>
                  {item.name}
                </Text>
              </XStack>

              {busStopSelected && busStopSelected.name === item.name && (
                <YStack f={1}>
                  {getLinesByBusStopId(item.id).map((line, idx) => (
                    <Text key={idx} color={line?.lineColor}>
                      - {line.name}
                    </Text>
                  ))}
                </YStack>
              )}

              <XStack
                bg='$colorTransparent'
                padding={'$3'}
                ai='center'
                onPress={() => {
                  removeBusStopFavorite(item);
                }}>
                <StarOff size={25} color={isDark ? COLORS.light : COLORS.dark} />
              </XStack>
            </XStack>
          ))}
        </ScrollView>
      )}
    </YStack>
  );
};
