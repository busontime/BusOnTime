import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';

import { DEFAULT_COORDINATE } from '@/constants/bd';

export const ImageMarker = ({
  coordinate = DEFAULT_COORDINATE,
  title = '',
  image = null,
  draggable = false,
  onDragEnd = (value) => {},
}) => {
  return (
    <Marker draggable={draggable} coordinate={coordinate} title={title} onDragEnd={onDragEnd}>
      {image && <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={image} />}
    </Marker>
  );
};
