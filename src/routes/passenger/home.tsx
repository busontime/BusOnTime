import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PassengerHomeScreen } from '@/screens/passenger/home';
import { PassengerLineScreen } from '@/screens/passenger/line';
import { PassengerBusStopScreen } from '@/screens/passenger/busStop';

const Stack = createStackNavigator();

export const PassengerHomeStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='home'
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
      <Stack.Screen name='home' component={PassengerHomeScreen} />
      <Stack.Screen name='line' component={PassengerLineScreen} />
      <Stack.Screen name='bus-stop' component={PassengerBusStopScreen} />
    </Stack.Navigator>
  );
};
