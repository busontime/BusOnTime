import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BusList } from '@/screens/admin/bus/busList';
import { BusForm } from '@/screens/admin/bus/busForm';

const Stack = createStackNavigator();

export const AdminBusStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='bus-list'
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: { animation: 'spring', config: { duration: 500 } },
          close: { animation: 'spring', config: { duration: 500 } },
        },
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}>
      <Stack.Screen name='bus-list' component={BusList} />
      <Stack.Screen name='bus-form' component={BusForm} />
    </Stack.Navigator>
  );
};
