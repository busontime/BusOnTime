import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';

export const Loader = () => {
  return (
    <LottieView
      autoPlay
      loop
      style={styles.container}
      source={require('@/assets/loader/Animation - 1701313780821.json')}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
