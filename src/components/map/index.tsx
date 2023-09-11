import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { styles } from './styles';

export const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -0.946515891877903,
          longitude: -80.72203683511071,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}>
        <Marker
          coordinate={{
            latitude: -0.946515891877903,
            longitude: -80.72203683511071,
          }}
          title='Mi ubicación'
          description='Manta, Ecuador'
        />
      </MapView>
    </View>
  );
};
