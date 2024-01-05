import React from 'react';
import { Marker } from 'react-native-maps';
import { Image, View } from 'tamagui';

export const ImageMarker = ({
  image = null,
  title = null,
  coordinate = null,
  onDragEnd = (value) => {},
  draggable = false,
}) => {
  return (
    <Marker title={title} draggable={draggable} onDragEnd={onDragEnd} coordinate={coordinate}>
      <View h={100} w={100}>
        <Image w={22} h={25} source={image} />
      </View>
    </Marker>
  );
};
