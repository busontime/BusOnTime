import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Theme } from 'tamagui';

import { useThemeContext } from '@/contexts/theme';

import { type ChildrenProps } from '@/interfaces';

export const ConfigApp: React.FC<ChildrenProps> = ({ children }) => {
  const { isDark } = useThemeContext();

  return (
    <AlertNotificationRoot theme={isDark ? 'dark' : 'light'}>
      <Theme name={isDark ? 'dark' : 'light'}>
        <StatusBar animated hidden />
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </Theme>
    </AlertNotificationRoot>
  );
};
