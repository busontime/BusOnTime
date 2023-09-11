import React from 'react';
import { View } from 'react-native';

import { Map } from '@/components/map';

export const PassengerHomeScreen = (): JSX.Element => {
  return (
    <View
      style={{ backgroundColor: 'transparent', paddingLeft: 15, height: '100%', width: '100%' }}>
      <Map />
    </View>
  );
};
