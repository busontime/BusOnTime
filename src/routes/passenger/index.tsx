import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { PassengerHomeStack } from './home';
import { PassengerProfileStack } from './profile';

import { Sidebar } from '@/components/sidebar';

const Drawer = createDrawerNavigator();

export const PassengerRouter = (): JSX.Element => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      initialRouteName='home-menu'
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name='home-menu'
        component={PassengerHomeStack}
        options={{
          drawerLabel: 'Inicio',
          title: 'home-filled',
        }}
      />

      <Drawer.Screen
        name='profile-menu'
        component={PassengerProfileStack}
        options={{
          drawerLabel: 'Mi Perfil',
          title: 'person-2',
        }}
      />
    </Drawer.Navigator>
  );
};
