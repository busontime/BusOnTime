import React, { useState, useEffect } from 'react';
import { YStack } from 'tamagui';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { getDistance } from 'geolib';

import { useMapContext } from '@/contexts/map';

import { travelService } from '@/services/travel';

import { TogleBack } from '@/components/togleBack';
import { LineSelectedView } from '@/components/passenger/lineSelectedView';
import { ImageMarker } from '@/components/marker';

import BusImg from '@/assets/images/bus.png';
import BusStopImg from '@/assets/images/stop.png';

import { MAP_STYLES } from '@/constants/styles';

export const PassengerLineScreen = () => {
  const { lineSelected, currentLocation } = useMapContext();

  const [travel, setTravel] = useState(null);
  const [busStop, setBusStop] = useState(null);

  const getTravels = () => {
    try {
      travelService.getAllInRealTime((data) => {
        const _travel = data.find((item) => item.line.id === lineSelected.id);

        setTravel(_travel || null);
      });
    } catch (error) {
      console.log('Error al recuperar el viaje de la linea', error);
    }
  };

  const initData = () => {
    const data = [...lineSelected.stops];

    data.sort((a, b) => {
      const distanceA = getDistance(currentLocation, a.coordinate);
      const distanceB = getDistance(currentLocation, b.coordinate);
      return distanceA - distanceB;
    });

    setBusStop(data[0]?.coordinate ?? currentLocation);
  };

  useEffect(() => {
    getTravels();
    initData();
  }, []);

  return (
    <YStack f={1} bg={'$backgroundFocus'}>
      <TogleBack disableTheme />

      <MapView
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        mapType='standard'
        customMapStyle={MAP_STYLES}
        style={{ flex: 1 }}
        region={{
          latitude: travel ? travel.location.latitude : busStop?.latitude,
          longitude: travel ? travel.location.longitude : busStop?.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
        }}>
        <Polyline
          coordinates={lineSelected?.route ?? []}
          strokeColor={lineSelected.lineColor}
          strokeWidth={3}
          geodesic={false}
        />

        {lineSelected?.stops?.map((item, index) => (
          <ImageMarker
            key={index}
            coordinate={item.coordinate}
            title={item.name}
            image={BusStopImg}
          />
        ))}

        {travel && (
          <ImageMarker image={BusImg} coordinate={travel?.location} title={lineSelected?.name} />
        )}
      </MapView>

      <LineSelectedView />
    </YStack>
  );
};
