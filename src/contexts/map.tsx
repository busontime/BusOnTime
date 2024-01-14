import React, { createContext, useContext, useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';

import { useAuthContext } from './auth';

import { busStopService } from '@/services/busStop';
import { lineService } from '@/services/line';

import { showAlertDialog } from '@/utils/dialog';

import { type ChildrenProps } from '@/interfaces';

import { DEFAULT_COORDINATE } from '@/constants/bd';

export const MapContext = createContext(null);

export const useMapContext = () => useContext(MapContext);

export const MapProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { profile } = useAuthContext();

  const [lines, setLines] = useState([]);
  const [lineSelected, setLineSelected] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [busStopSelected, setBusStopSelected] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_COORDINATE);

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
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });

          // setCurrentLocation(DEFAULT_COORDINATE);
        });
      } else {
        console.log('Location permission denied');

        setCurrentLocation(DEFAULT_COORDINATE);

        showAlertDialog('Permiso de Ubicación Denegado');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLines = async () => {
    try {
      const data = await lineService.getAll();
      setLines(data ?? []);
    } catch (error) {
      console.log('error get lines', error);
    }
  };

  const getBusStops = async () => {
    try {
      const data = await busStopService.getAll();
      setBusStops(data ?? []);
    } catch (error) {
      console.log('error get bus stops', error);
    }
  };

  const changeBusStop = (busStop) => {
    setBusStopSelected(busStop);
  };

  const changeLine = (line) => {
    setLineSelected(line);
  };

  const orderBusStops = () => {
    if (currentLocation) {
      busStops.sort((a, b) => {
        const distanceA = getDistance(currentLocation, a.coordinate);
        const distanceB = getDistance(currentLocation, b.coordinate);
        return distanceA - distanceB;
      });

      const _orderBusStops = [...busStops];

      setBusStops(_orderBusStops);
    }
  };

  useEffect(() => {
    orderBusStops();
  }, [currentLocation]);

  useEffect(() => {
    if (profile?.person) {
      requestLocationPermission();
    }
    getLines();
    getBusStops();
  }, [profile]);

  const data = {
    lines,
    lineSelected,
    changeLine,
    busStops,
    busStopSelected,
    changeBusStop,
    currentLocation,
    setCurrentLocation,
    getMapLines: getLines,
  };

  return <MapContext.Provider value={data}>{children}</MapContext.Provider>;
};
