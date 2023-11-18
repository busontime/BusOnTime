import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LineList } from '@/screens/admin/line/lineList';
import { LineForm } from '@/screens/admin/line/lineForm';

const Stack = createStackNavigator();

export const AdminLineStack = (props) => {
  return (
    <Stack.Navigator
      {...props}
      initialRouteName='line-list'
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
      <Stack.Screen name='line-list' component={LineList} />
      <Stack.Screen name='line-form' component={LineForm} />
    </Stack.Navigator>
  );
};
