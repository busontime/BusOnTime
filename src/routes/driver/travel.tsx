import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { TravelForm } from '@/screens/driver/travel/travelForm';
import { TravelList } from '@/screens/driver/travel/travelList';

const Stack = createStackNavigator();

export const DriverTravelStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='travel-form'
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
      <Stack.Screen name='travel-form' component={TravelForm} />
      <Stack.Screen name='travel-list' component={TravelList} />
    </Stack.Navigator>
  );
};
