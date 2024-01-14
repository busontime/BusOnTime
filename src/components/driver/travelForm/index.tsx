import React from 'react';
import { H4, YStack } from 'tamagui';

import { FormSelect } from '@/components/formSelect';
import { FormButtons } from '@/components/formButtons';

export const TravelForm = ({
  formValues,
  lines,
  cooperatives,
  changeCooperativeSelect,
  changeLineSelect,
  busesCooperative,
  changeBusSelect,
  goBack,
  initTravel,
}) => {
  return (
    <YStack ai='center' jc='center' space='$3'>
      <H4 color={'$color'}>Nuevo Recorrido</H4>

      <FormSelect
        label='Linea:'
        placeholder='Selecciona una linea'
        value={formValues?.line?.id}
        options={lines}
        onValueChange={changeLineSelect}
      />

      <FormSelect
        label='Cooperativa:'
        placeholder='Selecciona una cooperativa'
        value={formValues?.cooperative?.id}
        options={cooperatives}
        onValueChange={changeCooperativeSelect}
      />

      <FormSelect
        label='Bus:'
        placeholder='Selecciona un bus'
        emptyListMessage={
          formValues?.cooperative
            ? 'Cooperativa seleccionada sin buses disponibles, selecione otra cooperativa'
            : 'Debe seleccionar una Cooperativa primero para mostrar los buses disponibles'
        }
        value={formValues?.bus?.id}
        options={busesCooperative}
        onValueChange={changeBusSelect}
      />

      <FormButtons
        firstButtonAction={goBack}
        secondButtonText={'Iniciar'}
        secondButtonAction={initTravel}
        mb='$3'
      />
    </YStack>
  );
};
