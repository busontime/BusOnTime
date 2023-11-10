import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AdminHomeStack } from './home';
import { AdminProfileStack } from './profiles';
import { AdminDriverStack } from './driver';
import { AdminCooperativeStack } from './cooperatives';

import { Sidebar } from '@/components/sidebar';
import { AdminLineStack } from './line';

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
        name='cooperative-menu'
        component={AdminCooperativeStack}
        options={{
          drawerLabel: 'Cooperativas',
          title: 'maps-home-work',
        }}
      />

      <Drawer.Screen
        name='driver-menu'
        component={AdminDriverStack}
        options={{
          drawerLabel: 'Conductores',
          title: 'airline-seat-recline-normal',
        }}
      />

      <Drawer.Screen
        name='line-menu'
        component={AdminLineStack}
        options={{
          drawerLabel: 'Lineas',
          title: 'linear-scale',
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
