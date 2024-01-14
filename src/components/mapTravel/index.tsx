import React, { Fragment } from 'react';
import { H5 } from 'tamagui';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import { useMapContext } from '@/contexts/map';

import { ImageMarker } from '@/components/marker';

import LocationImg from '@/assets/images/location.png';
import BusImg from '@/assets/images/bus.png';
import BusStopImg from '@/assets/images/stop.png';

import { COLORS, MAP_STYLES } from '@/constants/styles';

export const MapTravel = ({ travel = null }) => {
  const { busStops } = useMapContext();

  return (
    <Fragment>
      {travel && (
        <MapView
          provider={PROVIDER_GOOGLE}
          loadingEnabled
          mapType='standard'
          customMapStyle={MAP_STYLES}
          region={{
            latitude:
              travel.route && travel.route.length > 0
                ? travel?.route[0].latitude
                : travel?.location?.latitude,
            longitude:
              travel.route && travel.route.length > 0
                ? travel?.route[0].longitude
                : travel?.location?.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          style={{ flex: 1 }}>
          {busStops?.map((item, index) => (
            <ImageMarker
              key={index}
              coordinate={item.coordinate}
              title={item.name}
              image={BusStopImg}
            />
          ))}

          {travel.route && travel.route.length > 0 && (
            <Fragment>
              <ImageMarker coordinate={travel?.route[0]} title={'Origen'} image={LocationImg} />

              <ImageMarker
                coordinate={travel?.route[travel?.route.length - 1]}
                title={'Destino'}
                image={BusImg}
              />

              <Polyline
                coordinates={travel.route}
                strokeWidth={5}
                strokeColor={COLORS.secondary}
                geodesic={false}
              />
            </Fragment>
          )}
        </MapView>
      )}

      {!travel && (
        <H5 color={'$color'} ta='center' mt='$4'>
          Recorrido Inexistente
        </H5>
      )}
    </Fragment>
  );
};
