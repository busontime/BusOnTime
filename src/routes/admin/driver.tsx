import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateDriver } from '@/screens/admin/createDriver';

const Stack = createStackNavigator();

export const AdminDriverStack = (props) => {
  return (
    <Stack.Navigator {...props} initialRouteName='driver' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='create-driver' component={CreateDriver} />
    </Stack.Navigator>
  );
};
