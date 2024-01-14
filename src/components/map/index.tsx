import React, { useState, useEffect } from 'react';
import { YStack } from 'tamagui';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

import { useMapContext } from '@/contexts/map';

import { travelService } from '@/services/travel';

import { ImageMarker } from '../marker';
import { MapSelectDirecction } from '../mapSelectDirecction';

import LocationImg from '@/assets/images/location.png';
import BusImg from '@/assets/images/bus.png';
import BusStopImg from '@/assets/images/stop.png';

import { COLORS, MAP_STYLES } from '@/constants/styles';

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
        mapPadding={{ top: 0, right: 0, bottom: 0, left: 40 }}
        showsCompass={true}
        compassOffset={{ x: 40, y: 10 }}
        style={{ flex: 1 }}
        region={{
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
        }}>
        <ImageMarker
          draggable
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
        <MapSelectDirecction directionMode={directionMode} setDirectionMode={setDirectionMode} />
      )}
    </YStack>
  );
};
