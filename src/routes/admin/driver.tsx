import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DriverList } from '@/screens/admin/driver/driverList';
import { DriverForm } from '@/screens/admin/driver/driverForm';

const Stack = createStackNavigator();

export const AdminDriverStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='driver-list'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='driver-list' component={DriverList} />
      <Stack.Screen name='driver-form' component={DriverForm} />
    </Stack.Navigator>
  );
};
