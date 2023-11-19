import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, SizableText, ScrollView, Image, H4 } from 'tamagui';

import { UserCircle } from 'lucide-react-native';

import { useAuthContext } from '@/contexts/auth';
import { useThemeContext } from '@/contexts/theme';

import { cooperativeService } from '@/services/cooperative';

import { FormInput } from '@/components/formInput';

import { convertFirestoreDateToString } from '@/utils/helpers';

import { COLORS } from '@/constants/styles';
import { ROLES_ID } from '@/constants/bd';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { profile } = useAuthContext();
  const { isDark } = useThemeContext();

  const { person } = profile;

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

    return cooperative ? cooperative?.name : 'N/A';
  };

  useEffect(() => {
    if (person.roleId === ROLES_ID.driver) {
      getCooperatives();
    }
  }, []);

  return (
    <ScrollView
      bg={'$backgroundFocus'}
      f={1}
      space='$3'
      p='$6'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <H4 color={'$color'} ta='center'>
        Perfil de Usuario
      </H4>

      {person?.photo ? (
        <Image
          resizeMode='contain'
          source={{ uri: person?.photo }}
          width={100}
          height={100}
          borderRadius={50}
        />
      ) : (
        <UserCircle color={isDark ? COLORS.light : COLORS.dark} size={70} />
      )}

      <FormInput label='Nombres:' value={person?.name} editable={false} />

      <FormInput label='Apellidos:' value={person?.lastname} editable={false} />

      <FormInput label='Email:' value={person?.email} editable={false} />

      <FormInput label='Teléfono:' value={person?.phone} editable={false} />

      <FormInput
        label='Fecha de nacimiento:'
        value={convertFirestoreDateToString(person?.birthdate)}
        editable={false}
      />

      {person?.ci && <FormInput label='Cédula:' value={person?.ci} editable={false} />}

      {person?.cooperativeId && (
        <FormInput
          label='Cooperativa:'
          value={getCooperativeName(person?.cooperativeId)}
          editable={false}
        />
      )}

      <Button
        onPress={() => {
          navigation.navigate('edit-profile' as never);
        }}
        bg='$green8'
        mt='$3'
        mb='$10'>
        <SizableText color={'$color'} fontWeight={'bold'}>
          Editar Perfil
        </SizableText>
      </Button>
    </ScrollView>
  );
};
