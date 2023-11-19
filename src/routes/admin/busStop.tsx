import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BusStopList } from '@/screens/admin/busStop/busStopList';
import { BusStopForm } from '@/screens/admin/busStop/busStopForm';

const Stack = createStackNavigator();

export const AdminBusStopStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='bus-stop-list'
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
      <Stack.Screen name='bus-stop-list' component={BusStopList} />
      <Stack.Screen name='bus-stop-form' component={BusStopForm} />
    </Stack.Navigator>
  );
};
