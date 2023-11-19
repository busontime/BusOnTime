import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserCircle } from 'lucide-react-native';
import { Button, SizableText, YStack, ScrollView, Image, H4 } from 'tamagui';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

import { FormInput } from '@/components/formInput';

import { useAuthContext } from '@/contexts/auth';
import { useThemeContext } from '@/contexts/theme';

import { cooperativeService } from '@/services/cooperative';

import { convertFirestoreDateToDate, convertFirestoreDateToString } from '@/utils/helpers';

import { COLORS } from '@/constants/styles';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { profile } = useAuthContext();
  const { isDark } = useThemeContext();

  const [cooperatives, setCooperatives] = useState([]);

  const getCooperatives = async () => {
    try {
      const data = await cooperativeService.getAll();
      setCooperatives(data);
    } catch (error) {
      console.log('Error al recuperar todas las cooperativas', error);
    }
  };

  const getCooperativeName = (coopId) => {
    const cooperative = cooperatives.find((coop) => coop?.id === coopId);
    return cooperative?.name || 'N/A';
  };

  const formattedProfile = {
    ...profile?.person,
    displayDate: convertFirestoreDateToString(profile?.person?.birthdate),
    birthdate: convertFirestoreDateToDate(profile?.person?.birthdate),
  };

  useEffect(() => {
    getCooperatives();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          bg={'$backgroundFocus'}
          showsVerticalScrollIndicator={false}
          f={1}
          space='$3'
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <YStack
            alignItems='center'
            backgroundColor='$backgroundFocus'
            height='100%'
            width='100%'
            gap='$3'
            padding='$9'>
            <H4 color={'$color'}>Perfil de usuario</H4>

            {profile?.person?.photo ? (
              <Image
                source={{ uri: profile?.person?.photo }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                }}
              />
            ) : (
              <UserCircle color={isDark ? COLORS.light : COLORS.dark} size={70} />
            )}

            <FormInput
              label='Nombres'
              value={profile?.person?.name}
              placeholder='Escriba sus nombres'
              editable={false}
            />

            <FormInput
              label='Apellidos:'
              value={profile?.person?.lastname}
              placeholder='Escriba sus apellidos'
              editable={false}
            />

            <FormInput
              label='Email:'
              value={profile?.person?.email}
              placeholder='Escriba su email'
              editable={false}
            />

            <FormInput
              label='Telefono:'
              value={profile?.person?.phone}
              placeholder='Escriba su telefono'
              editable={false}
            />

            <FormInput
              label='Fecha de nacimiento:'
              value={formattedProfile?.displayDate}
              placeholder='Fecha de nacimiento'
              editable={false}
            />

            {formattedProfile?.ci && (
              <FormInput
                label='Cédula:'
                value={formattedProfile?.ci}
                placeholder='Escriba su cédula'
                editable={false}
              />
            )}

            {profile?.person?.cooperativeId && (
              <FormInput
                label='Seleccione una cooperativa:'
                value={getCooperativeName(profile?.person?.cooperativeId)}
                placeholder='Cooperativa'
                editable={false}
              />
            )}

            <Button
              onPress={() => {
                navigation.navigate('edit-profile', formattedProfile);
              }}
              backgroundColor='$green8'>
              <SizableText color={'$color'} fontWeight={'bold'}>
                Editar
              </SizableText>
            </Button>
          </YStack>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
