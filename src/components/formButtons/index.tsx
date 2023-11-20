import React from 'react';
import { XStack, Button, SizableText } from 'tamagui';

export const FormButtons = ({
  firstButtonText = 'Cancelar',
  firstButtonAction = () => {},
  secondButtonText = 'Aceptar',
  secondButtonAction = () => {},
  mb = '$10',
}) => {
  return (
    <XStack space='$5' mt='$3' mb={mb}>
      <Button w={'$10'} bg={'$red8'} onPress={firstButtonAction} size='$3'>
        <SizableText color={'$color'} fontWeight={'bold'}>
          {firstButtonText}
        </SizableText>
      </Button>

      <Button w={'$10'} size='$3' bg='$green8' onPress={secondButtonAction}>
        <SizableText color={'$color'} fontWeight={'bold'}>
          {secondButtonText}
        </SizableText>
      </Button>
    </XStack>
  );
};
