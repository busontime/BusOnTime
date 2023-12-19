import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';

import { Providers } from '@/contexts';
import { ConfigApp } from './src';
import { AppRouter } from '@/routes';

LogBox.ignoreLogs(['']);
// LogBox.ignoreAllLogs();

export const App = (props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer {...props}>
        <Providers>
          <ConfigApp>
            <AppRouter />
          </ConfigApp>
        </Providers>
      </NavigationContainer>
    </TamaguiProvider>
  );
};
