import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDistance } from 'geolib';

import { busStopService } from '@/services/busStop';
import { lineService } from '@/services/line';

import { type ChildrenProps } from '@/interfaces';

export const MapContext = createContext(null);

export const useMapContext = () => useContext(MapContext);

export const MapProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [lines, setLines] = useState([]);
  const [busStops, setBusStops] = useState([]);
  const [busStopSelected, setBusStopSelected] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: -0.952515,
    longitude: -80.744904,
  });

  const getLines = async () => {
    try {
      const data = await lineService.getAll();
      const _data = data.map((element) => element._data);
      setLines(_data ?? []);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getBusStops = async () => {
    try {
      const data = await busStopService.getAll();
      const _data = data.map((element) => element._data);
      setBusStops(_data ?? []);
    } catch (error) {
      console.log('error', error);
    }
  };

  const changeBusStop = (busStop) => {
    setBusStopSelected(busStop);
  };

  useEffect(() => {
    getLines();
    getBusStops();
  }, []);

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

  const data = {
    lines,
    busStops,
    busStopSelected,
    changeBusStop,
    currentLocation,
    setCurrentLocation,
  };

  return <MapContext.Provider value={data}>{children}</MapContext.Provider>;
};
