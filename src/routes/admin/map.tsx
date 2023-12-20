import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AdminMapScreen } from '@/screens/admin/map';

const Stack = createStackNavigator();

export const AdminMapStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='map'
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
      <Stack.Screen name='map' component={AdminMapScreen} />
    </Stack.Navigator>
  );
};
