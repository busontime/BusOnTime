import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileScreen } from '@/screens/public/profile';
import { EditProfileScreen } from '@/screens/public/editProfile';

const Stack = createStackNavigator();

export const PassengerProfileStack = (props) => {
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
    </Stack.Navigator>
  );
};
