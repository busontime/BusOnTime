import { showErrorDialog } from '@/utils/dialog';

export const validateErrorLogin = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      showErrorDialog('Correo electrónico no válido.!');
      break;

    case 'auth/user-not-found':
      showErrorDialog('Usuario no registrado.!');
      break;

    case 'auth/wrong-password':
      showErrorDialog('Contraseña incorrecta.!');
      break;

    case 'auth/network-request-failed':
      showErrorDialog('Necesita conexión a internet.!');
      break;

    default:
      showErrorDialog('No puede iniciar Sesión.!');
      break;
  }
};

export const validateErrorEmail = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      showErrorDialog('Correo electrónico no válido.!');
      break;

    case 'auth/email-already-in-use':
      showErrorDialog('Correo electrónico ya en uso.!');
      break;

    case 'auth/network-request-failed':
      showErrorDialog('Necesita conexión a internet.!');
      break;

    case 'auth/requires-recent-login':
      showErrorDialog('Para poder modificar el email debe volver a iniciar sesion.!');
      break;

    default:
      showErrorDialog('No se pudo cambiar el email.!');
      break;
  }
  return false;
};

export const validateErrorDriver = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      showErrorDialog('Correo electrónico ya en uso.!');
      break;

    case 'auth/invalid-email':
      showErrorDialog('Correo electrónico no válido.!');
      break;

    case 'auth/weak-password':
      showErrorDialog('La contraseña es demasiado débil. Debe contener al menos 6 caracteres');
      break;

    case 'auth/network-request-failed':
      showErrorDialog('Necesita conexión a internet.!');
      break;

    default:
      showErrorDialog('No se pudo registrar, Intentelo más tarde.!');
      break;
  }
};

export const validateErrorCreateAccount = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      showErrorDialog('Correo electrónico ya en uso.!');
      break;

    case 'auth/invalid-email':
      showErrorDialog('Correo electrónico no válido.!');
      break;

    case 'auth/weak-password':
      showErrorDialog('La contraseña es demasiado débil. Debe contener al menos 6 caracteres');
      break;

    case 'auth/network-request-failed':
      showErrorDialog('Necesita conexión a internet.!');
      break;

    default:
      showErrorDialog('No puede registrarse, Intentelo más tarde.!');
      break;
  }
};
