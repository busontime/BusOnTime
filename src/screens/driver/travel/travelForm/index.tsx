import React, { useState, useEffect } from 'react';
import { H4, Button, SizableText, YStack, Card } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';

import { useAuthContext } from '@/contexts/auth';
import { useTravelContext } from '@/contexts/travel';
import { useMapContext } from '@/contexts/map';
import { useLoader } from '@/contexts/loader';

import { lineService } from '@/services/line';
import { busService } from '@/services/bus';
import { travelService } from '@/services/travel';

import { TogleSidebar } from '@/components/togleSidebar';
import { FormSelect } from '@/components/formSelect';
import { FormButtons } from '@/components/formButtons';
import { CardItem } from '@/components/admin/cardItem';
import { FormInput } from '@/components/formInput';
import { ModalOptions } from '@/components/modalOptions';

import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { showSuccessToast } from '@/utils/toast';
import { convertFirestoreDateToString } from '@/utils/helpers';

import { initTravelForm } from '@/constants/forms';
import { TRAVEL_STATUS } from '@/constants/bd';

const route = [];

export const TravelForm = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();

  const { currentTravel, changeCurrentTravel } = useTravelContext();
  const { currentLocation, getMapLines, setCurrentLocation } = useMapContext();
  const { profile } = useAuthContext();
  const { person, user } = profile;

  const [formValues, setFormValues] = useState(initTravelForm);
  const [lines, setLines] = useState([]);
  const [buses, setBuses] = useState([]);
  const [showCancel, setShowCancel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const initTravel = async () => {
    if (validateForm()) {
      showLoader();

      try {
        const data = {
          driver: { ...person, id: user.uid },
          line: formValues.line,
          bus: formValues.bus,
          date: new Date(),
          startTime: moment(new Date()).format('HH:mm:ss A'),
          endTime: '',
          location: currentLocation,
          state: TRAVEL_STATUS.active,
        };

        const newTravel = await travelService.create(data);
        const newTravelId = newTravel._documentPath._parts[1];

        changeCurrentTravel(newTravelId);

        route.push(currentLocation);

        setFormValues(initTravelForm);

        await busService.updateById(data.bus.id, { inUse: true });

        showSuccessDialog('Recorrido iniciado con éxito!');

        BackgroundTimer.runBackgroundTimer(() => {
          Geolocation.getCurrentPosition(async (info) => {
            const location = {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            };

            console.log('route.', route.length);
            route.push(location);

            await travelService.updateById(newTravelId, { location });

            setCurrentLocation(location);
          });
        }, 5000);
      } catch (error) {
        showErrorDialog('Ocurrió un error al iniciar el recorrido, inténtelo nuevamente');
        console.log(error, 'error al iniciar el recorrido');
      } finally {
        hideLoader();
      }
    }
  };

  const finishTravel = async () => {
    try {
      const data = {
        endTime: moment(new Date()).format('HH:mm:ss A'),
        state: TRAVEL_STATUS.finalized,
        route,
      };

      await travelService.updateById(currentTravel?.id, data);

      await busService.updateById(currentTravel.bus.id, { inUse: false });

      BackgroundTimer.stopBackgroundTimer();

      route.length = 0;

      changeCurrentTravel(null);

      await getMapLines();

      showSuccessToast('Recorrido Finalizado!');
    } catch (error) {
      showErrorDialog('Ocurrió un error al finalizar el recorrido, inténtelo nuevamente');
      console.log(error, 'error al finalizar el recorrido');
    }
  };

  const cancelTravel = async () => {
    if (validateCancellation()) {
      try {
        const data = {
          endTime: moment(new Date()).format('HH:mm:ss A'),
          state: TRAVEL_STATUS.cancelled,
          cancellation_message: formValues.cancellation_message,
          route,
        };

        await travelService.updateById(currentTravel?.id, data);

        await busService.updateById(currentTravel.bus.id, { inUse: false });

        BackgroundTimer.stopBackgroundTimer();

        route.length = 0;

        changeCurrentTravel(null);

        showSuccessToast('Recorrido Cancelado!');

        setShowCancel(false);
      } catch (error) {
        showErrorDialog('Ocurrió un error al cancelar el recorrido, inténtelo nuevamente');
        console.log(error, 'error al finalizar el recorrido');
      }
    }
  };

  const updateTravel = async () => {
    if (validateForm()) {
      showLoader();
      try {
        const data = {
          line: formValues.line,
          bus: formValues.bus,
        };

        await travelService.updateById(currentTravel?.id, data);

        if (formValues.bus.id !== currentTravel.bus.id) {
          await busService.updateById(currentTravel.bus.id, { inUse: false });

          await busService.updateById(formValues.bus.id, { inUse: true });
        }

        showSuccessToast('Recorrido Actualizado!');

        changeCurrentTravel(currentTravel?.id);

        setFormValues(initTravelForm);

        setShowEdit(false);
      } catch (error) {
        showErrorDialog('Ocurrió un error al actualizar el recorrido, inténtelo nuevamente');
        console.log(error, 'error al actualizar el recorrido');
      } finally {
        hideLoader();
      }
    }
  };

  const updateRouteLine = async () => {
    await lineService.updateById(currentTravel.line.id, { route });
  };

  const validateForm = () => {
    if (!formValues.line) {
      showAlertDialog('Debe seleccionar una linea');
      return false;
    }

    if (!formValues.bus) {
      showAlertDialog('Debe seleccionar un bus');
      return false;
    }

    return true;
  };

  const validateCancellation = () => {
    if (formValues.cancellation_message === '') {
      showAlertDialog('Escriba el motivo de cancelación');
      return false;
    }

    return true;
  };

  const changelineSelect = (id) => {
    const line = lines.find((item) => item.id === id);

    setFormValues({ ...formValues, line: line || null });
  };

  const changeBusSelect = (id) => {
    const bus = buses.find((item) => item.id === id);

    setFormValues({ ...formValues, bus: bus || null });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const getLines = async () => {
    try {
      const data = await lineService.getAll();
      setLines(data);
    } catch (error) {
      console.log('Error al recuperar todas las lineas', error);
    }
  };

  const getBuses = async () => {
    try {
      const data = await busService.getAll();
      setBuses(data);
    } catch (error) {
      console.log('Error al recuperar todos los buses', error);
    }
  };

  useEffect(() => {
    getLines();
    getBuses();
  }, []);

  return (
    <YStack f={1} bg={'$backgroundFocus'}>
      <TogleSidebar />

      <Button
        pos='absolute'
        size='$3'
        bg='$blue8'
        top={10}
        right={20}
        zi={10}
        onPress={() => {
          navigation.navigate('travel-list' as never);
        }}>
        <SizableText color={'$color'} fontWeight={'bold'}>
          Historial de Recorridos
        </SizableText>
      </Button>

      <YStack f={1} bg={'$backgroundFocus'} space='$4' ai='center' jc='center'>
        {currentTravel && (
          <YStack ai='center' jc='center' space='$3'>
            <H4 color={'$color'}>Recorrido Actual</H4>

            <Card
              elevate
              bordered
              paddingVertical='$3'
              paddingHorizontal='$5'
              size={'$3.5'}
              w={'$20'}>
              <CardItem label='Linea:' value={currentTravel?.line?.name} />

              <CardItem label='Bus:' value={currentTravel?.bus?.name} />

              <CardItem label='Fecha:' value={convertFirestoreDateToString(currentTravel?.date)} />

              <CardItem label='Hora de Salida:' value={currentTravel?.startTime} />
            </Card>

            {showCancel && (
              <YStack ai='center' jc='center' space='$3'>
                <FormInput
                  label='Motivo de cancelación'
                  placeholder='Escriba el motivo de Cancelación'
                  value={formValues.cancellation_message}
                  onChangeText={(text) => {
                    setFormValues({ ...formValues, cancellation_message: text });
                  }}
                />

                <FormButtons
                  firstButtonAction={() => {
                    setShowCancel(false);
                  }}
                  secondButtonText={'Aceptar'}
                  secondButtonAction={cancelTravel}
                  mb='$3'
                />
              </YStack>
            )}

            {showEdit && (
              <YStack ai='center' jc='center' space='$3'>
                <FormSelect
                  label='Linea:'
                  placeholder='Selecciona una linea'
                  value={formValues?.line?.id}
                  options={lines}
                  onValueChange={changelineSelect}
                />

                <FormSelect
                  label='Bus:'
                  placeholder='Selecciona un bus'
                  value={formValues?.bus?.id}
                  options={buses}
                  onValueChange={changeBusSelect}
                />

                <FormButtons
                  firstButtonAction={() => {
                    setShowEdit(false);
                  }}
                  secondButtonText={'Aceptar'}
                  secondButtonAction={updateTravel}
                  mb='$3'
                />
              </YStack>
            )}

            {!showCancel && !showEdit && (
              <YStack ai='center' jc='center' space='$3'>
                <FormButtons
                  firstButtonAction={() => {
                    setShowCancel(true);
                  }}
                  secondButtonText={'Actualizar'}
                  secondButtonAction={() => {
                    setFormValues({
                      ...formValues,
                      line: currentTravel.line,
                      bus: currentTravel.bus,
                    });
                    setShowEdit(true);
                  }}
                  mb='$3'
                />

                <ModalOptions
                  title={`Desea actualizar la linea con la ruta recorrida?`}
                  primaryButtonText='Si'
                  primaryButtonAction={async () => {
                    await updateRouteLine();
                    await finishTravel();
                  }}
                  secondButtonText='No'
                  secondButtonAction={finishTravel}>
                  <Button w={'$15'} size='$3' bg='$purple8'>
                    <SizableText color={'$color'} fontWeight={'bold'}>
                      Finalizar Recorrido
                    </SizableText>
                  </Button>
                </ModalOptions>

                <Button
                  w={'$15'}
                  size='$3'
                  bg='$orange8'
                  onPress={() => {
                    navigation.navigate('travel-map' as never);
                  }}>
                  <SizableText color={'$color'} fontWeight={'bold'}>
                    Ver Mapa
                  </SizableText>
                </Button>
              </YStack>
            )}
          </YStack>
        )}

        {!currentTravel && (
          <YStack ai='center' jc='center' space='$3'>
            <H4 color={'$color'}>Nuevo Recorrido</H4>

            <FormSelect
              label='Linea:'
              placeholder='Selecciona una linea'
              value={formValues?.line?.id}
              options={lines}
              onValueChange={changelineSelect}
            />

            <FormSelect
              label='Bus:'
              placeholder='Selecciona un bus'
              value={formValues?.bus?.id}
              options={buses}
              onValueChange={changeBusSelect}
            />

            <FormButtons
              firstButtonAction={goBack}
              secondButtonText={'Iniciar'}
              secondButtonAction={initTravel}
              mb='$3'
            />
          </YStack>
        )}
      </YStack>
    </YStack>
  );
};
