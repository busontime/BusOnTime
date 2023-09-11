import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const DriverProfileScreen = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'cyan', textAlign: 'center', fontWeight: 'bold', fontSize: 40 }}>
        Driver Profile
      </Text>

      <Button
        title='Back'
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
