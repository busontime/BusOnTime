import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileScreen } from '@/screens/public/profile';
import { EditProfile } from '@/screens/public/editProfile';

const Stack = createStackNavigator();

export const PassengerProfileStack = (props) => {
  return (
    <Stack.Navigator {...props} initialRouteName='profile' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='profile' component={ProfileScreen} />
      <Stack.Screen name='edit-profile' component={EditProfile} />
    </Stack.Navigator>
  );
};
