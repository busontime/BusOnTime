import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const PassengerProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'cyan', textAlign: 'center', fontWeight: 'bold', fontSize: 40 }}>
        Passenger Profile
      </Text>

      <Button
        title='Edicion de Perfil'
        onPress={() => {
          navigation.navigate('edit-profile' as never);
        }}
      />

      <Button
        title='Back'
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
