import React from 'react';
import { Adapt, Dialog, Sheet, XStack, YStack } from 'tamagui';
import { Camera, Image } from 'lucide-react-native';

import { COLORS } from '@/constants/styles';

import { useThemeContext } from '@/contexts/theme';

export const ImagePickerDialog = ({
  children,
  title = 'Que desea abrir?',
  descriptionOne = 'Galeria',
  descriptionTwo = 'Cámara',
  openGallery = () => {},
  openCamera = () => {},
}) => {
  const { isDark } = useThemeContext();

  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Adapt when='sm' platform='touch'>
        <Sheet animation='medium' zIndex={200000} modal dismissOnSnapToBottom>
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
          <Dialog.Title size={15}>{title}</Dialog.Title>

          <XStack jc='center' gap='$4' space='$2'>
            <YStack alignItems='center'>
              <Dialog.Description>{descriptionOne}</Dialog.Description>
              <Dialog.Close displayWhenAdapted asChild onPress={openGallery}>
                <Image color={isDark ? COLORS.light : COLORS.dark} size={70} />
              </Dialog.Close>
            </YStack>

            <YStack alignItems='center'>
              <Dialog.Description>{descriptionTwo}</Dialog.Description>
              <Dialog.Close displayWhenAdapted asChild onPress={openCamera}>
                <Camera color={isDark ? COLORS.light : COLORS.dark} size={70} />
              </Dialog.Close>
            </YStack>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
