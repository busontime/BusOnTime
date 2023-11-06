import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

import { userService } from '@/services/user';

import { type ChildrenProps } from '@/interfaces';
import {
  validateErrorCreateAccount,
  validateErrorDriver,
  validateErrorEmail,
  validateErrorLogin,
} from '@/utils/error';

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

  const updateProfile = async (updatedPerson) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      person: {
        ...prevProfile.person,
        ...updatedPerson,
      },
    }));
  };

  const updateEmail = async (email: string) => {
    try {
      await auth().currentUser.updateEmail(email);
      return true;
    } catch (error) {
      validateErrorEmail(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      validateErrorLogin(error);
    }
  };

  const createDriver = async (email: string, password: string) => {
    try {
      const data = await auth().createUserWithEmailAndPassword(email, password);
      logout();
      login('admin@bot.com', '123456');
      return data;
    } catch (error) {
      validateErrorDriver(error);
    }
  };

  const createAccount = async (email: string, password: string) => {
    try {
      const data = await auth().createUserWithEmailAndPassword(email, password);

      logout();

      return data;
    } catch (error) {
      validateErrorCreateAccount(error);
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
    updateEmail,
    loginWithGoogle,
    logout,
    login,
    createAccount,
    updateProfile,
    createDriver,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
