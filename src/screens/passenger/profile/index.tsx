import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserCircle2 } from 'lucide-react-native';
import { useThemeContext } from '@/contexts/theme';
import { COLORS } from '@/constants/styles';
import { Button, Form } from 'tamagui';
import { FormInput } from '@/components/formInput';
import { useAuthContext } from '@/contexts/auth';
import { firstWordUpper } from '@/utils/firstWordUpper';

export const PassengerProfileScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useThemeContext();
  const { profile } = useAuthContext();

  return (
    <Form
      onSubmit={() => {
        console.log('hi');
      }}
      alignItems='center'
      backgroundColor='$backgroundFocus'
      height='100%'
      width='100%'
      gap='$4'
      padding='$9'>
      <UserCircle2 color={isDark ? COLORS.light : COLORS.dark} size={70} />
      <FormInput
        value={firstWordUpper(profile?.person?.name)}
        placeholder='Nombre'
        disabled={true}
      />
      <FormInput
        value={firstWordUpper(profile?.person?.lastname)}
        placeholder='Apellido'
        disabled={true}
      />
      <FormInput value={profile?.person?.email} placeholder='Email' disabled={true} />
      <FormInput value={profile?.person?.phone} placeholder='Telefono' disabled={true} />
      <FormInput
        value={profile?.person?.birthdate}
        placeholder='Fecha de nacimiento'
        disabled={true}
      />
      <Button
        onPress={() => {
          navigation.navigate('edit-profile' as never);
        }}
        backgroundColor='$green8'>
        Editar
      </Button>
    </Form>
  );
};
