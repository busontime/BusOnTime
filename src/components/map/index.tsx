import React, { useState, useEffect } from 'react';

import { YStack, XStack, Stack } from 'tamagui';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Config from 'react-native-config';

import { CarFront, Footprints } from 'lucide-react-native';

import { useMapContext } from '@/contexts/map';

import BusStopImg from '@/assets/images/bus_stop.png';

import { COLORS, MAP_STYLES } from '@/constants/styles';

export const Map = () => {
  const { lines, busStops, busStopSelected, setCurrentLocation, currentLocation } = useMapContext();

  const [destination, setDestination] = useState(null);
  const [directionMode, setDirectionMode] = useState('WALKING');

  useEffect(() => {
    if (busStopSelected) {
      setDestination(busStopSelected.coordinate);
    }
  }, [busStopSelected]);

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
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          draggable
          pinColor={COLORS.green}
          coordinate={currentLocation}
          title={'Mi Ubicación'}
          onDragEnd={(direcction) => {
            setCurrentLocation(direcction.nativeEvent.coordinate);
          }}
        />

        {lines.map((item, index) => (
          <MapViewDirections
            key={index}
            origin={item?.origin?.coordinate}
            destination={item?.destination?.coordinate}
            waypoints={item.stops.map((item) => item.coordinate)}
            strokeColor={item.lineColor}
            strokeWidth={1}
            apikey={Config.GOOGLE_MAPS_API_KEY}
            mode={'DRIVING'}
          />
        ))}

        {busStops.map((item, index) => (
          <Marker key={index} coordinate={item.coordinate} title={item.name} image={BusStopImg} />
        ))}

        {currentLocation && destination && (
          <MapViewDirections
            origin={currentLocation}
            destination={destination}
            strokeColor={COLORS.secondary}
            strokeWidth={3}
            apikey={Config.GOOGLE_MAPS_API_KEY}
            mode={directionMode}
          />
        )}
      </MapView>

      {currentLocation && destination && (
        <XStack pos='absolute' top={'$2.5'} right={'$2.5'} space='$2'>
          <Stack
            bg={directionMode === 'DRIVING' ? '$gray11Dark' : '$colorTransparent'}
            borderRadius={'$5'}
            padding='$1.5'
            onPress={() => {
              setDirectionMode('DRIVING');
            }}>
            <CarFront color={COLORS.dark} size={30} />
          </Stack>

          <Stack
            bg={directionMode === 'WALKING' ? '$gray11Dark' : '$colorTransparent'}
            padding='$1.5'
            borderRadius={'$5'}
            onPress={() => {
              setDirectionMode('WALKING');
            }}>
            <Footprints color={COLORS.dark} size={30} />
          </Stack>
        </XStack>
      )}
    </YStack>
  );
};
