import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PassengerHomeScreen } from '@/screens/passenger/home';

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
    </Stack.Navigator>
  );
};
