import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

import { userService } from '@/services/user';

import { type ChildrenProps } from '@/interfaces';

import { validateAuthError } from '@/utils/error';

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

  const updateProfile = async () => {
    const personData = await userService.getById(auth().currentUser.uid);

    setProfile((prevProfile) => ({
      ...prevProfile,
      person: {
        ...prevProfile.person,
        ...personData,
      },
    }));
  };

  const updateEmail = async (email: string) => {
    try {
      await auth().currentUser.updateEmail(email);
      return true;
    } catch (error) {
      return validateAuthError(error, 'No se pudo cambiar el email.!');
    }
  };

  const updatePassword = async (password: string) => {
    try {
      await auth().currentUser.updatePassword(password);
      return true;
    } catch (error) {
      return validateAuthError(error, 'No se pudo cambiar la contraseña.');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      return validateAuthError(error, 'No puede iniciar Sesión.!');
    }
  };

  const createAccount = async (email: string, password: string) => {
    try {
      const data = await auth().createUserWithEmailAndPassword(email, password);

      logout();

      return data;
    } catch (error) {
      validateAuthError(error, 'No puede registrarse, Intentelo más tarde.!');
    }
  };

  const deleteAccount = async () => {
    try {
      await auth().currentUser.delete();
    } catch (error) {
      console.log('err', error);
      validateAuthError(error, 'No se puede eliminar, Intentelo más tarde.!');
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

  const sendPasswordResetEmail = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      return validateAuthError(error, 'Error al enviar el email de cambio de contraseña');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  const data = {
    profile,
    updateEmail,
    loginWithGoogle,
    logout,
    login,
    createAccount,
    updateProfile,
    deleteAccount,
    sendPasswordResetEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
