import React from 'react';
import { CooperativeList } from '@/screens/admin/cooperativeList';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateCooperative } from '@/screens/admin/createCoopetative';
import { UpdateCooperative } from '@/screens/admin/updateCooperative';

const stack = createStackNavigator();
export const AdminCooperativeStack = (props) => {
  return (
    <stack.Navigator
      {...props}
      initialRouteName='cooperative-list'
      screenOptions={{ headerShown: false }}>
      <stack.Screen name='cooperative-list' component={CooperativeList} />
      <stack.Screen name='create-coopetative' component={CreateCooperative} />
      <stack.Screen name='update-coopetative' component={UpdateCooperative} />
    </stack.Navigator>
  );
};
