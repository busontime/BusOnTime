import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { PassengerHomeStack } from './home';
import { PassengerProfileStack } from './profile';

import { SupportAndHelpScreen } from '@/screens/public/supportAndHelp';

import { Sidebar } from '@/components/sidebar';

const Drawer = createDrawerNavigator();

export const PassengerRouter = (props) => {
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
        component={PassengerHomeStack}
        options={{
          drawerLabel: 'Inicio',
          title: 'home-filled',
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
        component={PassengerProfileStack}
        options={{
          drawerLabel: 'Mi Perfil',
          title: 'person-2',
        }}
      />
    </Drawer.Navigator>
  );
};
