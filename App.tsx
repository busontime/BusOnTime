import 'react-native-gesture-handler';

import React from 'react';
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
  async function splash() {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    } catch (e) {
      console.warn(e);
    } finally {
      SplashScreen.hide();
    }
  }

  splash();

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
