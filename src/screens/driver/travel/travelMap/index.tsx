import React, { useState, useEffect } from 'react';
import { YStack, Stack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

import { ChevronLeftCircle } from 'lucide-react-native';

import { useMapContext } from '@/contexts/map';
import { useTravelContext } from '@/contexts/travel';

import BusStopImg from '@/assets/images/bus_stop.png';
import BusImg from '@/assets/images/bus.png';

import { COLORS, MAP_STYLES } from '@/constants/styles';

export const TravelMap = () => {
  const navigation = useNavigation();
  const { lines, busStops, currentLocation } = useMapContext();
  const { currentTravel } = useTravelContext();

  const [line, setLine] = useState(null);

  useEffect(() => {
    const _line = lines.find((item) => item.id === currentTravel.line.id && item.route);
    if (_line) {
      setLine(_line);
    }
  }, []);

  return (
    <YStack f={1}>
      <MapView
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        mapType='standard'
        customMapStyle={MAP_STYLES}
        style={{ flex: 1 }}
        region={{
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}>
        <Marker image={BusImg} coordinate={currentLocation} title={'Mi Ubicación'} />

        {line && (
          <MapViewDirections
            origin={line?.origin?.coordinate}
            destination={line?.destination?.coordinate}
            waypoints={line?.route}
            strokeColor={line.lineColor}
            strokeWidth={1}
            apikey={Config.GOOGLE_MAPS_API_KEY}
            mode={'DRIVING'}
          />
        )}

        {busStops.map((item, index) => (
          <Marker key={index} coordinate={item.coordinate} title={item.name} image={BusStopImg} />
        ))}
      </MapView>

      <Stack
        pos='absolute'
        top={'$2.5'}
        left={'$2.5'}
        bg={'$colorTransparent'}
        onPress={() => {
          navigation.goBack();
        }}>
        <ChevronLeftCircle color={COLORS.light} size={40} />
      </Stack>
    </YStack>
  );
};
