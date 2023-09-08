import React from 'react';
import { SafeAreaView, StatusBar, LogBox } from 'react-native';

LogBox.ignoreLogs(['']);
// LogBox.ignoreAllLogs();

export const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <StatusBar />
    </SafeAreaView>
  );
};
