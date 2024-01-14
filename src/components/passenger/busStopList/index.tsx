import React from 'react';
import { YStack, Text, XStack, ScrollView } from 'tamagui';

import { BusFront, Star, StarOff, Sparkles } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';
import { useMapContext } from '@/contexts/map';
import { useAuthContext } from '@/contexts/auth';

import { userService } from '@/services/user';

import { showAlertDialog } from '@/utils/dialog';
import { showSuccessToast } from '@/utils/toast';

import { COLORS } from '@/constants/styles';

export const BusStopList = ({ data = [], principalTab = true }) => {
  const { isDark } = useThemeContext();
  const { changeBusStop, busStopSelected, lines } = useMapContext();
  const { profile, updateProfile } = useAuthContext();
  const { user, person } = profile;

  const changeBusStopsFavorites = async (busStop) => {
    try {
      let busStops = person?.busStops ?? [];

      if (!principalTab) {
        busStops = busStops.filter((item) => item.id !== busStop.id);
      } else if (principalTab && !isBusStopFavorite(busStop)) {
        busStops.push(busStop);
      }

      await userService.updateById(user?.uid, { busStops });

      await updateProfile();

      showSuccessToast(`Parada favorita ${principalTab ? 'agregada' : 'elimada'}  exitósamente!`);
    } catch (error) {
      console.log('error al  actualizar', error);
      showAlertDialog('Error al agregar, Inténtelo más tarde');
    }
  };

  const isBusStopFavorite = (busStop) => person?.busStops?.some((item) => item.id === busStop.id);

  const getLinesByBusStopId = (id) => {
    const data = lines?.filter(
      (item) =>
        item.stops.some((stop) => stop.id === id) ||
        item?.destination.id === id ||
        item?.origin.id === id
    );

    return data ?? [];
  };

  return (
    <ScrollView>
      {data?.map((item, index) => (
        <XStack
          key={index}
          bg={
            busStopSelected && busStopSelected.name === item.name ? '$gray8' : '$colorTransparent'
          }
          borderBottomColor={'$gray8'}
          borderBottomWidth={'$0.5'}
          ai='center'
          jc='space-between'>
          <XStack space={'$2'} padding={'$3'} ai='center' f={1} onPress={() => changeBusStop(item)}>
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
              changeBusStopsFavorites(item);
            }}>
            {!principalTab ? (
              <StarOff size={25} color={COLORS.red} />
            ) : isBusStopFavorite(item) ? (
              <Sparkles size={25} color={isDark ? COLORS.yellow : COLORS.yellowDark} />
            ) : (
              <Star size={25} color={isDark ? COLORS.light : COLORS.dark} />
            )}
          </XStack>
        </XStack>
      ))}
    </ScrollView>
  );
};
