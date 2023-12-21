import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { YStack, XStack, Text, Image, Stack } from 'tamagui';

import { useAuthContext } from '@/contexts/auth';
import { useLoader } from '@/contexts/loader';

import { userService } from '@/services/user';

import { SidebarItem } from '../sidebarItem';
import { TogleTheme } from '../togleTheme';

import { ROLES_ID } from '@/constants/bd';

export const Sidebar = (props) => {
  const { state, descriptors, navigation } = props;

  const { showLoader, hideLoader } = useLoader();
  const { logout, profile } = useAuthContext();
  const { person, user } = profile;

  const handlerLogout = async () => {
    if (person?.roleId === ROLES_ID.admin) {
      showLoader();

      try {
        await userService.updateById(user?.uid, { verified: false });
      } catch (error) {
        console.log('error', error);
      } finally {
        hideLoader();
      }
    }

    logout();
  };
  return (
    <YStack bg={'$backgroundFocus'} f={1}>
      <DrawerContentScrollView {...props}>
        <XStack bg={'$blue8'} jc='space-around' padding='$2' ai='center' mt='$-1.5'>
          {person?.photo && (
            <Stack borderRadius={'$radius.9'} w={'$3.5'} h={'$3.5'} ml='$5'>
              <Image
                resizeMode='contain'
                source={{ uri: person?.photo }}
                width={'100%'}
                height={'100%'}
                borderRadius={50}
              />
            </Stack>
          )}
          {person && (
            <Text color={'$gray12'} fontWeight={'$true'} f={1} ta='center'>
              {person?.name || user?.email}
            </Text>
          )}

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

          <SidebarItem label='Cerrar Sesión' iconName='logout' onPress={handlerLogout} isRed />
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
