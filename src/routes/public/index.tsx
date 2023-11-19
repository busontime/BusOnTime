import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '@/screens/public/login';
import { RegisterScreen } from '@/screens/public/register';

const Stack = createStackNavigator();

export const PublicRouter = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='login'
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
      <Stack.Screen name='login' component={LoginScreen} />
      <Stack.Screen name='register' component={RegisterScreen} />
    </Stack.Navigator>
  );
};
