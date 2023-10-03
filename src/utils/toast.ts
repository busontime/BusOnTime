import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export const showAlertToast = (message = '', title = 'Alerta!') => {
  Toast.show({
    type: ALERT_TYPE.WARNING,
    title,
    textBody: message,
  });
};

export const showSuccessToast = (message = '', title = 'Exito!') => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title,
    textBody: message,
  });
};

export const showErrorToast = (message = '', title = 'Error!') => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title,
    textBody: message,
  });
};
