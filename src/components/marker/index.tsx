import React from 'react';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';

export const ImageMarker = ({ image, title = null, coordinate, onDragEnd = (value) => {} }) => {
  return (
    <Marker onDragEnd={onDragEnd} title={title} coordinate={coordinate}>
      <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={image} />
    </Marker>
  );
};
