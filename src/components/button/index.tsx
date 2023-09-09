import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = PropsWithChildren<{
  text: string;
  onPress?: () => void;
}>;

export const Button = ({ text, onPress = () => {} }: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};
