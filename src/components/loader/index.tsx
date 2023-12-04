import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import LoaderJson from '@/assets/json/loader.json';

export const Loader = () => {
  return <LottieView autoPlay loop style={styles.container} source={LoaderJson} />;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
