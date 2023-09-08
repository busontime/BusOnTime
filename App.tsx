import React from 'react';
import { SafeAreaView, StatusBar, LogBox, Text } from 'react-native';

LogBox.ignoreLogs(['']);
// LogBox.ignoreAllLogs();

export const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Text>Bienvenidos a mi app</Text>
    </SafeAreaView>
  );
};
