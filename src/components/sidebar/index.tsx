import React, { Fragment } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import { useAuthContext } from '@/contexts/auth';

import { SidebarItem } from '../sidebarItem';

import { styles } from './styles';

export const Sidebar = (props) => {
  const { state, descriptors, navigation } = props;

  const { logout, user } = useAuthContext();

  return (
    <Fragment>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{user?.displayName || user?.email}</Text>
        </View>

        <View style={styles.content}>
          {state.routes.map((route, index) => (
            <SidebarItem
              key={index}
              active={state.index === index}
              label={descriptors[route.key].options.drawerLabel}
              iconName={descriptors[route.key].options.title}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: route.name }],
                })
              }
            />
          ))}

          <SidebarItem label='Cerrar Sesión' iconName='logout' onPress={logout} color='red' />
        </View>
      </DrawerContentScrollView>

      <SafeAreaView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>©2023 - Bus On Time.</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};
