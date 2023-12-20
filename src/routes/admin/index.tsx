import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AdminHomeStack } from './home';
import { AdminTravelStack } from './travel';
import { AdminMapStack } from './map';
import { AdminCooperativeStack } from './cooperative';
import { AdminDriverStack } from './driver';
import { AdminBusStack } from './bus';
import { AdminLineStack } from './line';
import { AdminBusStopStack } from './busStop';
import { AdminProfileStack } from './profile';

import { Sidebar } from '@/components/sidebar';

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
        name='map-menu'
        component={AdminMapStack}
        options={{
          drawerLabel: 'Mapa',
          title: 'map',
        }}
      />

      <Drawer.Screen
        name='travel-menu'
        component={AdminTravelStack}
        options={{
          drawerLabel: 'Recorridos',
          title: 'alt-route',
        }}
      />

      <Drawer.Screen
        name='cooperative-menu'
        component={AdminCooperativeStack}
        options={{
          drawerLabel: 'Cooperativas',
          title: 'apartment',
        }}
      />

      <Drawer.Screen
        name='driver-menu'
        component={AdminDriverStack}
        options={{
          drawerLabel: 'Conductores',
          title: 'assignment-ind',
        }}
      />

      <Drawer.Screen
        name='bus-menu'
        component={AdminBusStack}
        options={{
          drawerLabel: 'Buses',
          title: 'directions-bus',
        }}
      />

      <Drawer.Screen
        name='line-menu'
        component={AdminLineStack}
        options={{
          drawerLabel: 'Lineas',
          title: 'route',
        }}
      />

      <Drawer.Screen
        name='bus-stop-menu'
        component={AdminBusStopStack}
        options={{
          drawerLabel: 'Paradas',
          title: 'bus-alert',
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
