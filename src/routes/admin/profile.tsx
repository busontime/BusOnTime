import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileScreen } from '@/screens/public/profile';
import { EditProfileScreen } from '@/screens/public/editProfile';
import { EditPasswordScreen } from '@/screens/public/editPassword';

const Stack = createStackNavigator();

export const AdminProfileStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='profile'
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
      <Stack.Screen name='profile' component={ProfileScreen} />
      <Stack.Screen name='edit-profile' component={EditProfileScreen} />
      <Stack.Screen name='change-password' component={EditPasswordScreen} />
    </Stack.Navigator>
  );
};
