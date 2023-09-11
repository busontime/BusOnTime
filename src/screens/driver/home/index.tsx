import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const DriverHomeScreen = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'cyan', textAlign: 'center', fontWeight: 'bold', fontSize: 40 }}>
        Home Driver
      </Text>

      <Button
        title='Profile'
        onPress={() => {
          navigation.navigate('profile-menu' as never);
        }}
      />
    </View>
  );
};
