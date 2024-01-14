import React from 'react';
import { Image } from 'react-native';

import LogoImg from '@/assets/images/logo.jpg';

export const Logo = () => {
  return (
    <Image
      style={{
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderRadius: 100,
      }}
      source={LogoImg}
    />
  );
};
