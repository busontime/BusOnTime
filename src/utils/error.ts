import { showErrorDialog } from '@/utils/dialog';

export const validateAuthError = (error, textDefault = 'Ocurrio un error!') => {
  switch (error.code) {
    case 'auth/invalid-email':
      showErrorDialog('Correo electrónico no válido.!');
      break;

    case 'auth/email-already-in-use':
      showErrorDialog('Correo electrónico ya en uso.!');
      break;

    case 'auth/user-not-found':
      showErrorDialog('Usuario no registrado.!');
      break;

    case 'auth/weak-password':
      showErrorDialog('La contraseña es demasiado débil. Debe contener al menos 6 caracteres');
      break;

    case 'auth/wrong-password':
      showErrorDialog('Contraseña incorrecta.!');
      break;

    case 'auth/network-request-failed':
      showErrorDialog('Necesita conexión a internet.!');
      break;

    case 'auth/requires-recent-login':
      showErrorDialog(
        'Para poder modificar la credenciales de acceso debe volver a iniciar sesión.!'
      );
      break;

    default:
      showErrorDialog(textDefault);
      break;
  }

  return false;
};
