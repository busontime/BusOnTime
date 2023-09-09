import React from 'react';
import { SafeAreaView, StatusBar, LogBox, Text } from 'react-native';

LogBox.ignoreLogs(['']);
// LogBox.ignoreAllLogs();

export const App = (): JSX.Element => {
  const title = 'Bienvenidos a mi app Bus on Time';
  return (
    <SafeAreaView>
      <StatusBar />
      <Text>{title}</Text>
    </SafeAreaView>
  );
};
