import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView, StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Providers } from '@/contexts';
import { AppRouter } from '@/routes';

LogBox.ignoreLogs(['']);
// LogBox.ignoreAllLogs();

export const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Providers>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar animated={true} />
          <AppRouter />
        </SafeAreaView>
      </Providers>
    </NavigationContainer>
  );
};
