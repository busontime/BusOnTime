import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserCircle2 } from 'lucide-react-native';
import { useThemeContext } from '@/contexts/theme';
import { COLORS } from '@/constants/styles';
import { Button, SizableText, YStack } from 'tamagui';
import { FormInput } from '@/components/formInput';
import { useAuthContext } from '@/contexts/auth';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useThemeContext();
  const { profile } = useAuthContext();

  return (
    <YStack
      alignItems='center'
      backgroundColor='$backgroundFocus'
      height='100%'
      width='100%'
      gap='$4'
      padding='$9'>
      <UserCircle2 color={isDark ? COLORS.light : COLORS.dark} size={70} />
      <FormInput value={profile?.person?.name} placeholder='Nombre' editable={false} />
      <FormInput value={profile?.person?.lastname} placeholder='Apellido' editable={false} />
      <FormInput value={profile?.person?.email} placeholder='Email' editable={false} />
      <FormInput value={profile?.person?.phone} placeholder='Telefono' editable={false} />
      <FormInput
        value={profile?.person?.birthdate}
        placeholder='Fecha de nacimiento'
        editable={false}
      />
      <Button
        onPress={() => {
          navigation.navigate('edit-profile' as never);
        }}
        backgroundColor='$green8'>
        <SizableText color={'$color'} fontWeight={'bold'}>
          Editar
        </SizableText>
      </Button>
    </YStack>
  );
};
