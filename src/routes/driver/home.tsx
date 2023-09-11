import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DriverHomeScreen } from '@/screens/driver/home';

const Stack = createStackNavigator();

export const DriverHomeStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home' component={DriverHomeScreen} />
    </Stack.Navigator>
  );
};
