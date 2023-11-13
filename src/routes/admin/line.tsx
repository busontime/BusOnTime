import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LineList } from '@/screens/admin/lineList';
import { CreateLine } from '@/screens/admin/createLine';
import { UpdateLine } from '@/screens/admin/updateLine';

const stack = createStackNavigator();

export const AdminLineStack = (props) => {
  return (
    <stack.Navigator {...props} initialRouteName='line-list' screenOptions={{ headerShown: false }}>
      <stack.Screen name='line-list' component={LineList} />
      <stack.Screen name='create-line' component={CreateLine} />
      <stack.Screen name='update-line' component={UpdateLine} />
    </stack.Navigator>
  );
};
