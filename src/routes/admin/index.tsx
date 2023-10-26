import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AdminHomeStack } from './home';
import { AdminProfileStack } from './profiles';

import { Sidebar } from '@/components/sidebar';
import { AdminDriverStack } from './driver';

const Drawer = createDrawerNavigator();

export const AdminRouter = (props) => {
  return (
    <Drawer.Navigator
      {...props}
      drawerContent={(props) => <Sidebar {...props} />}
      initialRouteName='home-menu'
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name='home-menu'
        component={AdminHomeStack}
        options={{
          drawerLabel: 'Inicio',
          title: 'home-filled',
        }}
      />

      <Drawer.Screen
        name='driver-menu'
        component={AdminDriverStack}
        options={{
          drawerLabel: 'Crear Conductor',
          title: 'airline-seat-recline-normal',
        }}
      />

      <Drawer.Screen
        name='profile-menu'
        component={AdminProfileStack}
        options={{
          drawerLabel: 'Mi Perfil',
          title: 'person-2',
        }}
      />
    </Drawer.Navigator>
  );
};
