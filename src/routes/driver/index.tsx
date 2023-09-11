import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DriverHomeStack } from './home';
import { DriverProfileStack } from './profile';

import { Sidebar } from '@/components/sidebar';

const Drawer = createDrawerNavigator();

export const DriverRouter = (): JSX.Element => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      initialRouteName='home-menu'
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name='home-menu'
        component={DriverHomeStack}
        options={{
          drawerLabel: 'Inicio',
          title: 'home-filled',
        }}
      />

      <Drawer.Screen
        name='profile-menu'
        component={DriverProfileStack}
        options={{
          drawerLabel: 'Mi Perfil',
          title: 'person-2',
        }}
      />
    </Drawer.Navigator>
  );
};
