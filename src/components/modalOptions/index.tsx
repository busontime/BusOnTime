import React from 'react';
import { AlertDialog, Button, YStack, Text, XStack } from 'tamagui';

export const ModalOptions = ({
  children,
  title = 'Está seguro de realizar esta acción?',
  primaryButtonText = 'Cancelar',
  primaryButtonColor = '$blue8',
  primaryButtonAction = () => {},
  secondButtonText = 'Eliminar',
  secondButtonColor = '$red8',
  secondButtonAction = () => {},
}) => {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal px='$3'>
        <AlertDialog.Overlay
          key='overlay'
          animation='bouncy'
          opacity={1}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key='content'
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: 300, opacity: 1, scale: 0.9 }}
          exitStyle={{ x: 0, y: 300, opacity: 0, scale: 0.95 }}
          x={0}
          y={0}
          scale={1}
          opacity={1}>
          <YStack space='$3'>
            <Text ta='center' color={'$color'}>
              {title}
            </Text>

            <XStack space='$3' jc='center'>
              <AlertDialog.Cancel asChild onPress={primaryButtonAction}>
                <Button bg={primaryButtonColor} color={'$color'}>
                  {primaryButtonText}
                </Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action asChild onPress={secondButtonAction}>
                <Button bg={secondButtonColor} color={'$color'}>
                  {secondButtonText}
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};
