import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CooperativeList } from '@/screens/admin/cooperative/cooperativeList';
import { CreateCooperative } from '@/screens/admin/cooperative/createCooperative';
import { UpdateCooperative } from '@/screens/admin/cooperative/updateCooperative';

const Stack = createStackNavigator();

export const AdminCooperativeStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='cooperative-list'
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
      <Stack.Screen name='cooperative-list' component={CooperativeList} />
      <Stack.Screen name='create-cooperative' component={CreateCooperative} />
      <Stack.Screen name='update-cooperative' component={UpdateCooperative} />
    </Stack.Navigator>
  );
};
