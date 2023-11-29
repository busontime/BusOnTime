import React from 'react';
import { Adapt, Dialog, Sheet, XStack, YStack } from 'tamagui';
import { Camera, UserCircle, Image as Img } from 'lucide-react-native';

import { COLORS } from '@/constants/styles';

import { useThemeContext } from '@/contexts/theme';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { selectPicture } from '@/utils/helpers';
import { showAlertDialog } from '@/utils/dialog';

export const ImagePickerDialog = ({ picture = null, changePicture = (value) => {} }) => {
  const { isDark } = useThemeContext();

  const openCameraOrGallery = async (isCamera = false) => {
    try {
      const result = await selectPicture(isCamera);
      changePicture(result);
    } catch (error) {
      console.log('error image', error);
      showAlertDialog('No se pudo abrir la camara');
    }
  };
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <TouchableWithoutFeedback>
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
            <XStack bg={'$colorTransparent'} position='absolute' bottom={0} left={70}>
              <Camera size={40} strokeWidth={2} color={isDark ? COLORS.light : COLORS.dark} />
            </XStack>
          </YStack>
        </TouchableWithoutFeedback>
      </Dialog.Trigger>

      <Adapt when='sm' platform='touch'>
        <Sheet animation='slow' zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding='$4' gap='$4'>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation='lazy' enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key='overlay'
          animation='slow'
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key='content'
          animateOnly={['transform', 'opacity']}
          animation={[
            'slow',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap='$4'>
          <Dialog.Title size={15}>Que desea abrir?</Dialog.Title>

          <XStack jc='center' gap='$4' space='$2'>
            <YStack alignItems='center'>
              <Dialog.Description>Galería</Dialog.Description>
              <Dialog.Close
                displayWhenAdapted
                asChild
                onPress={() => {
                  openCameraOrGallery(false);
                }}>
                <Img color={isDark ? COLORS.light : COLORS.dark} size={70} />
              </Dialog.Close>
            </YStack>

            <YStack alignItems='center'>
              <Dialog.Description>Cámara</Dialog.Description>
              <Dialog.Close
                displayWhenAdapted
                asChild
                onPress={() => {
                  openCameraOrGallery(true);
                }}>
                <Camera color={isDark ? COLORS.light : COLORS.dark} size={70} />
              </Dialog.Close>
            </YStack>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
