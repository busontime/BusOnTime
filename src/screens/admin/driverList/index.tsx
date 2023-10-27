import React, { useState, useEffect } from 'react';
import { Button, ScrollView, H4, Text, Card, XStack, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { Contact } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { userService } from '@/services/user';

import { COLORS } from '@/constants/styles';

export const DriverList = () => {
  const navigation = useNavigation();
  const [drivers, setDrivers] = useState([]);

  const { isDark } = useThemeContext();

  const getDrivers = async () => {
    try {
      const data = await userService.getAllDrivers();
      data.sort((a, b) => a._data.name.localeCompare(b._data.name));
      setDrivers(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <YStack f={1} bg={'$backgroundFocus'} padding='$3' space='$2' pos='relative'>
      <H4 color={'$color'} textAlign='center'>
        Lista de Conductores
      </H4>

      <Button
        pos='absolute'
        top={'$2.5'}
        right={'$2.5'}
        size={'$3.5'}
        variant='outlined'
        backgroundColor={'$blue8'}
        onPress={() => {
          navigation.navigate('driver' as never);
        }}>
        Nuevo
      </Button>

      <ScrollView
        space='$3'
        f={1}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {drivers.map((item, index) => (
          <Card elevate bordered size={'$3.5'} key={index} w={'$20'}>
            <Card.Header padded>
              <XStack jc='space-between'>
                <XStack space='$2'>
                  <Text color={'$color'} fontWeight={'$true'}>
                    Nombre:
                  </Text>
                  <Text color={'$color'} fontStyle='italic'>
                    {item?._data?.name} {item?._data?.lastname}
                  </Text>
                </XStack>

                <Contact size={22} color={isDark ? COLORS.light : COLORS.dark} />
              </XStack>

              <XStack space='$2'>
                <Text color={'$color'} fontWeight={'$true'}>
                  Email:
                </Text>
                <Text color={'$color'} fontStyle='italic'>
                  {item?._data?.email}
                </Text>
              </XStack>

              <XStack space='$2'>
                <Text color={'$color'} fontWeight={'$true'}>
                  Teléfono:
                </Text>
                <Text color={'$color'} fontStyle='italic'>
                  {item?._data?.phone}
                </Text>
              </XStack>

              <XStack space='$2'>
                <Text color={'$color'} fontWeight={'$true'}>
                  Cédula:
                </Text>
                <Text color={'$color'} fontStyle='italic'>
                  {item?._data?.cedula}
                </Text>
              </XStack>
            </Card.Header>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
};
