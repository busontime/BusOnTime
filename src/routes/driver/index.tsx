import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DriverHomeStack } from './home';
import { DriverTravelStack } from './travel';
import { DriverProfileStack } from './profile';

import { SupportAndHelpScreen } from '@/screens/public/supportAndHelp';

import { Sidebar } from '@/components/sidebar';

const Drawer = createDrawerNavigator();

export const DriverRouter = (props) => {
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
        component={DriverHomeStack}
        options={{
          drawerLabel: 'Inicio',
          title: 'home-filled',
        }}
      />

      <Drawer.Screen
        name='travel-menu'
        component={DriverTravelStack}
        options={{
          drawerLabel: 'Recorridos',
          title: 'directions-bus',
        }}
      />

      <Drawer.Screen
        name='help-menu'
        component={SupportAndHelpScreen}
        options={{
          drawerLabel: 'Ayuda y Soporte',
          title: 'help-outline',
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
