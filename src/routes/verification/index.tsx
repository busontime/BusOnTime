import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AdminVerificationScreen } from '@/screens/admin/verification';

const Stack = createStackNavigator();

export const AdminVerificationRouter = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='verification'
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
      <Stack.Screen name='verification' component={AdminVerificationScreen} />
    </Stack.Navigator>
  );
};
