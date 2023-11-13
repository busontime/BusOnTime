import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StopList } from '@/screens/admin/stopList';
import { CreateStop } from '@/screens/admin/createStop';
import { UpdateStops } from '@/screens/admin/updateStop';

const stack = createStackNavigator();
export const AdminStopStack = (props) => {
  return (
    <stack.Navigator {...props} initialRouteName='stop-list' screenOptions={{ headerShown: false }}>
      <stack.Screen name='stop-list' component={StopList} />
      <stack.Screen name='create-stop' component={CreateStop} />
      <stack.Screen name='update-stop' component={UpdateStops} />
    </stack.Navigator>
  );
};
