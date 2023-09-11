import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const RegisterScreen = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'cyan', textAlign: 'center', fontWeight: 'bold', fontSize: 40 }}>
        Register
      </Text>

      <View style={{ display: 'flex', gap: 15, marginTop: 10 }}>
        <Button
          title='login'
          onPress={() => {
            navigation.navigate('login' as never);
          }}
        />
      </View>
    </View>
  );
};
