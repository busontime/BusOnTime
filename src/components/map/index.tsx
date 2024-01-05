import React, { useState, useEffect, Fragment } from 'react';

import { YStack, XStack, Stack } from 'tamagui';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

import { CarFront, Footprints } from 'lucide-react-native';

import { useMapContext } from '@/contexts/map';

import { travelService } from '@/services/travel';

import LocationImg from '@/assets/images/location.png';
import BusImg from '@/assets/images/bus.png';
import BusStopImg from '@/assets/images/stop.png';

import { COLORS, MAP_STYLES } from '@/constants/styles';
import { ImageMarker } from '../marker';

export const Map = () => {
  const { lines, lineSelected, busStops, busStopSelected, setCurrentLocation, currentLocation } =
    useMapContext();

  const [destination, setDestination] = useState(null);
  const [directionMode, setDirectionMode] = useState('WALKING');
  const [travels, setTravels] = useState([]);

  const getTravels = () => {
    try {
      travelService.getAllInRealTime((data) => {
        setTravels(data);
      });
    } catch (error) {
      console.log('Error al recuperar todos los viajes', error);
    }
  };

  useEffect(() => {
    getTravels();
  }, []);

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
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
        }}>
        <ImageMarker
          coordinate={currentLocation}
          title={'Mi Ubicación'}
          image={LocationImg}
          onDragEnd={(direcction) => {
            setCurrentLocation(direcction.nativeEvent.coordinate);
          }}
        />

        {lineSelected ? (
          <Polyline
            coordinates={lineSelected?.route ?? []}
            strokeColor={lineSelected.lineColor}
            strokeWidth={3}
            geodesic={false}
          />
        ) : (
          lines?.map((item, index) => (
            <Polyline
              key={index}
              coordinates={item?.route ?? []}
              strokeColor={item.lineColor}
              strokeWidth={1}
              geodesic={false}
            />
          ))
        )}

        {busStops?.map((item, index) => (
          <ImageMarker
            key={index}
            coordinate={item.coordinate}
            title={item.name}
            image={BusStopImg}
          />
        ))}

        {travels?.map((item, index) => (
          <ImageMarker
            key={index}
            coordinate={item?.location}
            title={item?.line?.name}
            image={BusImg}
          />
        ))}

        {currentLocation && destination && (
          <Fragment>
            <MapViewDirections
              origin={currentLocation}
              destination={destination}
              strokeColor={COLORS.secondary}
              strokeWidth={3}
              apikey={Config.GOOGLE_MAPS_API_KEY}
              mode={directionMode}
            />

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
          </Fragment>
        )}
      </MapView>
    </YStack>
  );
};
