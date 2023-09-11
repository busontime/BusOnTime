import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { styles } from './styles';

type SidebarItemProps = PropsWithChildren<{
  label: string;
  iconName?: string;
  onPress?: () => void;
  active?: boolean;
  color?: string;
}>;

export const SidebarItem = ({
  label,
  iconName = 'home',
  onPress = () => {},
  active = false,
  color = 'black',
}: SidebarItemProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: active ? 'cyan' : 'transparent' }]}
      onPress={onPress}>
      <MaterialIcon name={iconName} size={40} color={color} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};
