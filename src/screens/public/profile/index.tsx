import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, SizableText, ScrollView, H4, YStack } from 'tamagui';

import { useAuthContext } from '@/contexts/auth';
import { useLoader } from '@/contexts/loader';

import { uploadImage } from '@/services/storage';
import { cooperativeService } from '@/services/cooperative';
import { userService } from '@/services/user';

import { TogleSidebar } from '@/components/togleSidebar';
import { ImagePickerDialog } from '@/components/imagePickerDialog';
import { FormInput } from '@/components/formInput';

import { convertFirestoreDateToString } from '@/utils/helpers';
import { showAlertDialog } from '@/utils/dialog';
import { showSuccessToast } from '@/utils/toast';

import { ROLES_ID } from '@/constants/bd';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();
  const { profile, updateProfile } = useAuthContext();

  const { person, user } = profile;

  const [cooperatives, setCooperatives] = useState([]);

  const getCooperatives = async () => {
    showLoader();

    try {
      const data = await cooperativeService.getAll();
      setCooperatives(data);
    } catch (error) {
      console.log('Error al recuperar todas las cooperativas', error);
    } finally {
      hideLoader();
    }
  };

  const updateProfilePicture = async (picture) => {
    showLoader();

    try {
      const photoUri = picture?.uri;

      if (photoUri && photoUri !== '') {
        const photoUrl = await uploadImage(photoUri, user?.uid + '/' + 'profile.png');

        await userService.updateById(user?.uid, { photo: photoUrl });

        await updateProfile();

        showSuccessToast('Imagen de Perfil Actualizada!');
      }
    } catch (error) {
      showAlertDialog('Error al subir la imagen');
    } finally {
      hideLoader();
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
    <YStack f={1}>
      <TogleSidebar />

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

        <ImagePickerDialog changePicture={updateProfilePicture} picture={person?.photo} />

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
          w='$20'>
          <SizableText color={'$color'} fontWeight={'bold'}>
            Editar Perfil
          </SizableText>
        </Button>

        <Button
          onPress={() => {
            navigation.navigate('change-password' as never);
          }}
          bg='$blue8'
          w='$20'
          mb='$10'>
          <SizableText color={'$color'} fontWeight={'bold'}>
            Cambiar Contraseña
          </SizableText>
        </Button>
      </ScrollView>
    </YStack>
  );
};
