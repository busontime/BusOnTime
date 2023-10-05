import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

import { userService } from '@/services/user';

import { showErrorDialog } from '@/utils/dialog';

import { type ChildrenProps } from '@/interfaces';

GoogleSignin.configure({ webClientId: Config.WEB_CLIENT_ID });

export const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const data = await auth().signInWithCredential(googleCredential);

      return data;
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateProfile = (updatedPerson) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      person: {
        ...prevProfile.person,
        ...updatedPerson,
      },
    }));
  };

  const login = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error', error);

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
    }
  };

  const createAccount = async (email: string, password: string) => {
    try {
      const data = await auth().createUserWithEmailAndPassword(email, password);

      logout();

      return data;
    } catch (error) {
      console.log('error', error);

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
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('error', error);
    }
  };

  const onAuthStateChanged = async (user) => {
    const _profile = { user, person: null };

    if (user) {
      const { _user } = user;

      const data = await userService.getById(_user.uid);

      _profile.person = data;
    }

    setProfile(_profile);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  const data = {
    profile,
    loginWithGoogle,
    logout,
    login,
    createAccount,
    updateProfile,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
