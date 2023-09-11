import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '@/screens/public/login';
import { RegisterScreen } from '@/screens/public/register';

const Stack = createStackNavigator();

export const PublicRouter = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='login' component={LoginScreen} />
      <Stack.Screen name='register' component={RegisterScreen} />
    </Stack.Navigator>
  );
};
