import React, { useState, useEffect } from 'react';
import { Modal, PermissionsAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { XStack, YStack, SizableText } from 'tamagui';

import { MapPin } from 'lucide-react-native';

import { useMapContext } from '@/contexts/map';

import { ModalButtons } from '../modalButtons';

import { showAlertDialog } from '@/utils/dialog';

import { COLORS } from '@/constants/styles';

import { styles } from './styles';

export const PickLocation = ({ selectLocation = (val) => {}, coordinate = null }) => {
  const { setCurrentLocation, currentLocation } = useMapContext();

  const [showModal, setShowModal] = useState(false);
  const [marker, setMarker] = useState(null);

  const handlerMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarker(coordinate);
  };

  const closeModal = () => {
    setMarker(null);
    setShowModal(false);
  };

  const handlerAccept = () => {
    if (!marker) {
      showAlertDialog('Seleccione la ubicación de la parada!');
      return;
    }

    selectLocation(marker);
    closeModal();
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de ubicación',
          message: 'La aplicación necesita acceso a su ubicación.',
          buttonNeutral: 'Pregúntame Luego',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');

        Geolocation.getCurrentPosition((info) => {
          setCurrentLocation({
            // latitude: -0.945576,
            // longitude: -80.723126,
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        });
      } else {
        console.log('permission denied');

        setCurrentLocation({
          latitude: -0.952515,
          longitude: -80.744904,
        });

        showAlertDialog('Permiso de Ubicación Denegado');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (coordinate?.latitude !== '' && coordinate?.longitude !== '') {
      setMarker(coordinate);
    }
  }, [coordinate]);

  return (
    <YStack marginVertical='$2'>
      <XStack
        width={'$20'}
        space={'$2.5'}
        alignItems='center'
        onPress={() => {
          setShowModal(true);
        }}>
        <MapPin size={30} color={COLORS.secondary} strokeWidth={2} />

        <SizableText color={'$color'} fontWeight={'bold'}>
          Seleccionar la ubicación
        </SizableText>
      </XStack>

      <Modal animationType='fade' transparent visible={showModal}>
        <YStack f={1}>
          <MapView
            provider={PROVIDER_GOOGLE}
            loadingEnabled
            mapType='standard'
            customMapStyle={styles}
            initialRegion={{
              latitude: marker ? marker?.latitude : currentLocation?.latitude,
              longitude: marker ? marker?.longitude : currentLocation?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={handlerMapPress}
            style={{ flex: 1 }}>
            {marker && <Marker title='Parada' coordinate={marker} pinColor={COLORS.secondary} />}
          </MapView>

          <ModalButtons firstButtonAction={closeModal} secondButtonAction={handlerAccept} />
        </YStack>
      </Modal>
    </YStack>
  );
};
