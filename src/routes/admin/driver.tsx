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
      <Stack.Screen
        name='driver-list'
        options={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
        component={DriverList}
      />
      <Stack.Screen name='driver-form' component={DriverForm} />
    </Stack.Navigator>
  );
};
