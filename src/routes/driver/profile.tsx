import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DriverProfileScreen } from '@/screens/driver/profile';

const Stack = createStackNavigator();

export const DriverProfileStack = (props) => {
  return (
    <Stack.Navigator {...props} initialRouteName='profile' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='profile' component={DriverProfileScreen} />
    </Stack.Navigator>
  );
};
