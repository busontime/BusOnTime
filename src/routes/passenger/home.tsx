import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PassengerHomeScreen } from '@/screens/passenger/home';

const Stack = createStackNavigator();

export const PassengerHomeStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home' component={PassengerHomeScreen} />
    </Stack.Navigator>
  );
};
