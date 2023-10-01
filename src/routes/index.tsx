import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Theme } from 'tamagui';

import { PublicRouter } from './public';
import { AdminRouter } from './admin';
import { DriverRouter } from './driver';
import { PassengerRouter } from './passenger';

import { useAuthContext } from '@/contexts/auth';
import { useThemeContext } from '@/contexts/theme';

import { styles } from './styles';

export const AppRouter = () => {
  const [router, setRouter] = useState('');

  const { user } = useAuthContext();
  const { isDark } = useThemeContext();

  const configRouter = () => {
    if (user === null || user === undefined) {
      setRouter('public');
    } else if (user.email === 'admin@busontime.com') {
      setRouter('admin');
    } else if (user.email === 'driver@busontime.com') {
      setRouter('driver');
    } else if (user.email === 'passenger@busontime.com') {
      setRouter('passenger');
    } else {
      setRouter('passenger');
    }
  };

  useEffect(() => {
    configRouter();
  }, [user]);

  return (
    <Theme name={isDark ? 'dark' : 'light'}>
      <StatusBar animated={true} />
      <SafeAreaView style={styles.content}>
        {router === 'public' && <PublicRouter />}
        {router === 'admin' && <AdminRouter />}
        {router === 'driver' && <DriverRouter />}
        {router === 'passenger' && <PassengerRouter />}
      </SafeAreaView>
    </Theme>
  );
};
