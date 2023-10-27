import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DriverList } from '@/screens/admin/driverList';
import { CreateDriver } from '@/screens/admin/createDriver';

const Stack = createStackNavigator();

export const AdminDriverStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='driver-list'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='driver-list' component={DriverList} />
      <Stack.Screen name='driver' component={CreateDriver} />
    </Stack.Navigator>
  );
};
