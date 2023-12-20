import React, { useState } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { XStack, YStack, Text, Button, Sheet } from 'tamagui';

import { Camera, UserCircle, Image as Img } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { selectPicture } from '@/utils/helpers';
import { showAlertDialog } from '@/utils/dialog';

import { COLORS } from '@/constants/styles';

export const ImagePickerDialog = ({ picture = null, changePicture = (value) => {} }) => {
  const { isDark } = useThemeContext();

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);

  const openCameraOrGallery = async (isCamera = false) => {
    setOpen(false);

    try {
      const result = await selectPicture(isCamera);
      changePicture(result);
    } catch (error) {
      console.log('error image', error);
      showAlertDialog('No se pudo abrir la camara');
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpen(true);
        }}>
        <YStack position='relative' width={100} height={100}>
          {picture ? (
            <Image
              source={{ uri: picture }}
              resizeMode='contain'
              width={100}
              height={100}
              borderRadius={50}
            />
          ) : (
            <UserCircle strokeWidth={1} color={isDark ? COLORS.light : COLORS.dark} size={100} />
          )}
          <XStack
            height={45}
            width={45}
            borderRadius={50}
            bg={COLORS.secondary}
            position='absolute'
            justifyContent='center'
            alignItems='center'
            bottom={0}
            left={70}>
            <Camera size={30} strokeWidth={2} color={isDark ? COLORS.light : COLORS.dark} />
          </XStack>
        </YStack>
      </TouchableWithoutFeedback>

      <Sheet
        forceRemoveScrollEnabled={open}
        onOpenChange={setOpen}
        zIndex={100_000}
        position={position}
        snapPointsMode='fit'
        open={open}
        animation={'medium'}
        onPositionChange={setPosition}
        modal={open}>
        <Sheet.Overlay animation={'lazy'} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

        <Sheet.Handle />

        <Sheet.Frame padding='$4' space='$3'>
          <Text ta='left' color={isDark ? COLORS.light : COLORS.dark} fontSize={20}>
            Foto de perfil
          </Text>

          <XStack jc='space-evenly'>
            <YStack space='$2' alignItems='center'>
              <Button
                borderWidth={'$0.5'}
                borderColor={COLORS.secondary}
                onPress={() => {
                  openCameraOrGallery(true);
                }}
                icon={<Camera color={COLORS.secondary} size={30} />}
                height={50}
                width={50}
                borderRadius={50}
              />
              <Text color={isDark ? COLORS.light : COLORS.dark} fontSize={14}>
                Cámara
              </Text>
            </YStack>

            <YStack space='$2' alignItems='center'>
              <Button
                borderWidth={'$0.5'}
                borderColor={COLORS.secondary}
                onPress={() => {
                  openCameraOrGallery(false);
                }}
                icon={<Img color={COLORS.secondary} size={30} />}
                height={50}
                width={50}
                borderRadius={50}
              />
              <Text color={isDark ? COLORS.light : COLORS.dark} fontSize={14}>
                Galería
              </Text>
            </YStack>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
