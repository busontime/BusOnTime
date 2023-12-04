import 'react-native-gesture-handler';

import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';
import SplashScreen from 'react-native-splash-screen';

import { Providers } from '@/contexts';
import { ConfigApp } from './src';
import { AppRouter } from '@/routes';
import { LoadingProvider } from '@/contexts/loading';

LogBox.ignoreLogs(['']);
// LogBox.ignoreAllLogs();

export const App = (props) => {
  async function splash() {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
    } catch (e) {
      console.warn(e);
    } finally {
      SplashScreen.hide();
    }
  }
  splash();
  return (
    <LoadingProvider>
      <TamaguiProvider config={config}>
        <NavigationContainer {...props}>
          <Providers>
            <ConfigApp>
              <AppRouter />
            </ConfigApp>
          </Providers>
        </NavigationContainer>
      </TamaguiProvider>
    </LoadingProvider>
  );
};
