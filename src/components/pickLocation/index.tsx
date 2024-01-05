import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { XStack, YStack, SizableText } from 'tamagui';
import { MapPin } from 'lucide-react-native';

import { useMapContext } from '@/contexts/map';

import { ModalButtons } from '../modalButtons';

import { showAlertDialog } from '@/utils/dialog';

import { COLORS, MAP_STYLES } from '@/constants/styles';
import { ImageMarker } from '../marker';

export const PickLocation = ({ changeValue = (val) => {}, coordinate = null, markerName = '' }) => {
  const { currentLocation } = useMapContext();

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

    changeValue(marker);
    closeModal();
  };

  useEffect(() => {
    if (coordinate) {
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
            customMapStyle={MAP_STYLES}
            initialRegion={{
              latitude: marker ? Number(marker?.latitude) : currentLocation?.latitude,
              longitude: marker ? Number(marker?.longitude) : currentLocation?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={handlerMapPress}
            style={{ flex: 1 }}>
            {marker && (
              <ImageMarker
                coordinate={{
                  latitude: Number(marker?.latitude),
                  longitude: Number(marker?.longitude),
                }}
                title={markerName !== '' ? markerName : 'Parada'}
                pinColor={COLORS.secondary}
              />
            )}
          </MapView>

          <ModalButtons firstButtonAction={closeModal} secondButtonAction={handlerAccept} />
        </YStack>
      </Modal>
    </YStack>
  );
};
