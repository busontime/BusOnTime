import React, { Fragment } from 'react';
import { H5 } from 'tamagui';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import { COLORS, MAP_STYLES } from '@/constants/styles';
import { ImageMarker } from '../marker';

export const MapTravel = ({ travel = null }) => {
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
          {travel.route && travel.route.length > 0 && (
            <Fragment>
              <ImageMarker
                coordinate={travel?.route[0]}
                title={'Origen'}
                pinColor={COLORS.primary}
              />

              <ImageMarker
                coordinate={travel?.route[travel?.route.length - 1]}
                title={'Destino'}
                pinColor={COLORS.green}
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
