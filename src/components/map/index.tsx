import React, { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { YStack, XStack, Stack } from 'tamagui';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';

import { CarFront, Footprints } from 'lucide-react-native';

import { useMapContext } from '@/contexts/map';

import { showAlertDialog } from '@/utils/dialog';

import LocationImg from '@/assets/images/location.png';
import BusStopImg from '@/assets/images/bus_stop.png';

import { COLORS } from '@/constants/styles';

import { styles } from './styles';

export const Map = () => {
  const { lines, busStops, busStopSelected, setCurrentLocation, currentLocation } = useMapContext();

  const [destination, setDestination] = useState(null);
  const [directionMode, setDirectionMode] = useState('WALKING');

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de ubicación',
          message: 'La aplicación necesita acceso a su ubicación.',
          buttonNeutral: 'Pregúntame Luego',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');

        Geolocation.getCurrentPosition((info) => {
          setCurrentLocation({
            // latitude: -0.945576,
            // longitude: -80.723126,
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        });
      } else {
        console.log('permission denied');

        setCurrentLocation({
          latitude: -0.952515,
          longitude: -80.744904,
        });

        showAlertDialog('Permiso de Ubicación Denegado');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
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
        style={styles.f1}
        region={{
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          draggable
          image={LocationImg}
          coordinate={currentLocation}
          title={'Mi Ubicación'}
          onDragEnd={(direcction) => {
            setCurrentLocation(direcction.nativeEvent.coordinate);
          }}
        />

        {lines.map((item, index) => (
          <MapViewDirections
            key={index}
            origin={item.origin}
            destination={item.destination}
            waypoints={item.stops}
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
