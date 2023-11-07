import React, { Fragment } from 'react';
import { Button, H4 } from 'tamagui';

export const HeaderList = ({ title = '', onPress = () => {}, buttonText = 'Nuevo' }) => {
  return (
    <Fragment>
      <H4 color={'$color'} textAlign='center'>
        {title}
      </H4>

      <Button
        pos='absolute'
        top={'$2.5'}
        right={'$2.5'}
        size={'$3.5'}
        variant='outlined'
        backgroundColor={'$blue8'}
        onPress={onPress}>
        {buttonText}
      </Button>
    </Fragment>
  );
};
