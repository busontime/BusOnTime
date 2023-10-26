import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserCircle2 } from 'lucide-react-native';
import { useThemeContext } from '@/contexts/theme';
import { COLORS } from '@/constants/styles';
import { Button, SizableText, YStack, View, Label, ScrollView } from 'tamagui';
import { FormInput } from '@/components/formInput';
import { useAuthContext } from '@/contexts/auth';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useThemeContext();
  const { profile } = useAuthContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          bg={'$backgroundFocus'}
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
            <UserCircle2 color={isDark ? COLORS.light : COLORS.dark} size={70} />

            <View>
              <Label margin='$1'>Nombres:</Label>
              <FormInput value={profile?.person?.name} placeholder='Nombre' editable={false} />
            </View>

            <View>
              <Label margin='$1'>Apellidos:</Label>
              <FormInput
                value={profile?.person?.lastname}
                placeholder='Apellido'
                editable={false}
              />
            </View>

            <View>
              <Label margin='$1'>Email:</Label>
              <FormInput value={profile?.person?.email} placeholder='Email' editable={false} />
            </View>

            <View>
              <Label margin='$1'>Telefono:</Label>
              <FormInput value={profile?.person?.phone} placeholder='Telefono' editable={false} />
            </View>

            <View>
              <Label margin='$1'>Fecha de nacimiento:</Label>
              <FormInput
                value={profile?.person?.birthdate}
                placeholder='Fecha de nacimiento'
                editable={false}
              />
            </View>

            {profile?.person?.cedula && (
              <View>
                <Label margin='$1'>Cédula:</Label>
                <FormInput value={profile?.person?.cedula} placeholder='Cedula' editable={false} />
              </View>
            )}

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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
