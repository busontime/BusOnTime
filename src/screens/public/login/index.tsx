import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuthContext } from '@/contexts/auth';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { user, loginWithGoogle, login } = useAuthContext();

  const loginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'cyan', textAlign: 'center', fontWeight: 'bold', fontSize: 40 }}>
        Login Screen
      </Text>
      <Text style={{ color: 'green' }}>{user?.email}</Text>

      <View style={{ display: 'flex', gap: 15, marginTop: 10 }}>
        <Button
          color={'purple'}
          title='Register'
          onPress={() => {
            navigation.navigate('register' as never);
          }}
        />

        <Button
          color={'orange'}
          title='Sign In Admin'
          onPress={async () => {
            await login('admin@busontime.com', '12345678');
          }}
        />

        <Button
          color={'gray'}
          title='Sign In Passenger'
          onPress={async () => {
            await login('passenger@busontime.com', '12345678');
          }}
        />

        <Button
          color={'green'}
          title='Sign In Driver'
          onPress={async () => {
            await login('driver@busontime.com', '12345678');
          }}
        />

        <Button title='Google Sign-In' onPress={loginGoogle} />
      </View>
    </View>
  );
};
