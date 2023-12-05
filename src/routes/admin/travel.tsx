import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { TravelList } from '@/screens/admin/travel/travelList';
import { TravelMap } from '@/screens/admin/travel/travelMap';

const Stack = createStackNavigator();

export const AdminTravelStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='travel-list'
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
      <Stack.Screen name='travel-list' component={TravelList} />
      <Stack.Screen name='travel-map' component={TravelMap} />
    </Stack.Navigator>
  );
};
