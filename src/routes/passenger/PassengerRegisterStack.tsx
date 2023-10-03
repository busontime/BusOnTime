import React from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { PassengerRegister } from '@/screens/passenger/home/PassengerRegister';

const stack = createStackNavigator();

export const PassengerRegisterStack = (props) => {
  return (
    <stack.Navigator {...props} initialRouteName='passenger' screenOptions={{ headerShown: false }}>
      <stack.Screen name='register' component={PassengerRegister} />
    </stack.Navigator>
  );
};
