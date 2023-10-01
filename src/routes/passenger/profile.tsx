import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PassengerProfileScreen } from '@/screens/passenger/profile';

const Stack = createStackNavigator();

export const PassengerProfileStack = (props) => {
  return (
    <Stack.Navigator {...props} initialRouteName='profile' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='profile' component={PassengerProfileScreen} />
    </Stack.Navigator>
  );
};
