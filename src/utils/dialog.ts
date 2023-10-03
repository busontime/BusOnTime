import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export const showAlertDialog = (message = '', title = 'Alerta!', textButton = 'Aceptar') => {
  Dialog.show({
    type: ALERT_TYPE.WARNING,
    title,
    textBody: message,
    button: textButton,
  });
};

export const showSuccessDialog = (message = '', title = 'Exito!', textButton = 'Aceptar') => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title,
    textBody: message,
    button: textButton,
  });
};

export const showErrorDialog = (message = '', title = 'Error!', textButton = 'Aceptar') => {
  Dialog.show({
    type: ALERT_TYPE.DANGER,
    title,
    textBody: message,
    button: textButton,
  });
};
