import React from 'react';
import { XStack, Button, SizableText } from 'tamagui';

import { X, Check } from 'lucide-react-native';

import { COLORS } from '@/constants/styles';

export const ModalButtons = ({
  firstButtonText = 'Cancelar',
  firstButtonAction = () => {},
  secondButtonText = 'Aceptar',
  secondButtonAction = () => {},
}) => {
  return (
    <XStack space={'$2'} padding='$2' jc='center' ai='center'>
      <Button
        w={'$14'}
        borderColor={'$red8'}
        borderWidth='$1'
        onPress={firstButtonAction}
        icon={<X size={22} color={COLORS.red} strokeWidth={3} />}>
        <SizableText color={'$color'} fontWeight={'bold'}>
          {firstButtonText}
        </SizableText>
      </Button>

      <Button
        w={'$14'}
        borderColor='$green8'
        borderWidth='$1'
        onPress={secondButtonAction}
        icon={<Check size={22} color={COLORS.green} strokeWidth={3} />}>
        <SizableText color={'$color'} fontWeight={'bold'}>
          {secondButtonText}
        </SizableText>
      </Button>
    </XStack>
  );
};
