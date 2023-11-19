import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AdminHomeScreen } from '@/screens/admin/home';

const Stack = createStackNavigator();

export const AdminHomeStack = (props) => {
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
      <Stack.Screen name='home' component={AdminHomeScreen} />
    </Stack.Navigator>
  );
};
