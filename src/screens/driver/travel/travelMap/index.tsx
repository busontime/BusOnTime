import React, { useState, useEffect } from 'react';
import { YStack } from 'tamagui';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import { useMapContext } from '@/contexts/map';
import { useTravelContext } from '@/contexts/travel';

import { TogleBack } from '@/components/togleBack';
import { ImageMarker } from '@/components/marker';

import BusImg from '@/assets/images/bus.png';
import BusStopImg from '@/assets/images/stop.png';

import { COLORS, MAP_STYLES } from '@/constants/styles';

export const TravelMap = () => {
  const { lines, busStops, currentLocation } = useMapContext();
  const { currentTravel } = useTravelContext();

  const [line, setLine] = useState(null);

  useEffect(() => {
    const _line = lines.find((item) => item.id === currentTravel.line.id && item.route);
    if (_line) {
      setLine(_line);
    }
  }, [lines, currentTravel]);

  return (
    <YStack f={1}>
      <TogleBack disableTheme />

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
        {currentLocation && (
          <ImageMarker image={BusImg} coordinate={currentLocation} title={'Mi Ubicación'} />
        )}

        {line?.route && (
          <Polyline
            coordinates={line.route}
            strokeWidth={5}
            strokeColor={COLORS.secondary}
            geodesic={false}
          />
        )}

        {busStops.map((item, index) => (
          <ImageMarker
            key={index}
            coordinate={item.coordinate}
            title={item.name}
            image={BusStopImg}
          />
        ))}
      </MapView>
    </YStack>
  );
};
