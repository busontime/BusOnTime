import moment from 'moment';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

import { TRAVEL_STATUS } from '@/constants/bd';
import { COLORS } from '@/constants/styles';

export const convertFirestoreDateToString = (date) => {
  if (!date) {
    return '';
  }

  if (moment(date, moment.ISO_8601, true).isValid()) {
    return moment(date).format('DD/MM/YYYY');
  }

  const time = date.seconds * 1000 + Math.round(date.nanoseconds / 1e6);

  return moment(time).format('DD/MM/YYYY');
};

export const convertFirestoreDateToDate = (date) => {
  if (!date) {
    return new Date();
  }

  if (moment(date, moment.ISO_8601, true).isValid()) {
    return new Date(date);
  }

  const time = date.seconds * 1000 + Math.round(date.nanoseconds / 1e6);

  return new Date(time);
};

export const selectPicture = async (isCamera = false) => {
  const options = {
    mediaType: 'photo',
    includeBase64: true,
  };

  const response = isCamera ? await launchCamera(options) : await launchImageLibrary(options);
  if (!response.didCancel && !response.errorCode && response.assets.length > 0) {
    return {
      uri: response.assets[0].uri,
      fileSize: (Number(response.assets[0].fileSize) / 1024 / 1024).toFixed(2),
      fileName: response.assets[0].fileName,
      type: response.assets[0].type,
    };
  } else {
    return null;
  }
};

export const getDiffYears = (date) => {
  if (!date) {
    return 0;
  }

  const _date = moment(date);

  return moment().diff(_date, 'years');
};

export const getTravelStatus = (status) => {
  let data = { label: '', color: COLORS.light };

  switch (status) {
    case TRAVEL_STATUS.active:
      data = { label: 'Activo', color: COLORS.green };
      break;

    case TRAVEL_STATUS.finalized:
      data = { label: 'Finalizado', color: COLORS.secondary };
      break;

    case TRAVEL_STATUS.cancelled:
      data = { label: 'Cancelado', color: COLORS.red };
      break;

    default:
      break;
  }

  return data;
};
