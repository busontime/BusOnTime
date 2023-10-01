import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import { useAuthContext } from '@/contexts/auth';

import { SidebarItem } from '../sidebarItem';
import { TogleTheme } from '../togleTheme';

export const Sidebar = (props) => {
  const { state, descriptors, navigation } = props;

  const { logout, user } = useAuthContext();

  return (
    <YStack bg={'$backgroundFocus'} f={1}>
      <DrawerContentScrollView {...props}>
        <XStack bg={'$blue8'} jc='space-between' padding='$2' ai='center' mt='$-1.5'>
          <Text color={'$gray12'} fontWeight={'$true'} f={1} ta='center'>
            {user?.displayName || user?.email}
          </Text>

          <TogleTheme />
        </XStack>

        <YStack pl={'$5'} mt='$2'>
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

          <SidebarItem label='Cerrar Sesión' iconName='logout' onPress={logout} isRed />
        </YStack>
      </DrawerContentScrollView>

      <XStack borderTopColor={'$gray12'} borderTopWidth='$0.25' p='$2.5'>
        <Text color={'$gray12'} ta='center' f={1} fontWeight={'$true'}>
          ©2023 - Bus On Time.
        </Text>
      </XStack>
    </YStack>
  );
};
