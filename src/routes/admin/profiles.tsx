import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AdminProfileScreen } from '@/screens/admin/profile';

const Stack = createStackNavigator();

export const AdminProfileStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName='profile' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='profile' component={AdminProfileScreen} />
    </Stack.Navigator>
  );
};
