import React, { useState } from 'react';
import { Stack, Input, Button } from 'tamagui';

import { Eye, EyeOff } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { COLORS } from '@/constants/styles';

export const FormInput = ({
  placeholder = '',
  value = '',
  onChangeText = (val) => {},
  type = 'default',
  isSecure = false,
  disabled = false,
}) => {
  const { isDark } = useThemeContext();

  const [showPassword, setShowPassword] = useState(isSecure);

  return (
    <Stack>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={type}
        secureTextEntry={showPassword}
        disabled={disabled}
        w='$20'
        focusStyle={{
          bw: 2,
          boc: '$blue8',
        }}
        pr={isSecure ? '$8' : '$4'}
      />
      {isSecure && (
        <Button
          pos='absolute'
          right={'$3'}
          p='$0'
          backgroundColor='transparent'
          onPress={() => {
            setShowPassword(!showPassword);
          }}
          icon={
            showPassword ? (
              <EyeOff color={isDark ? COLORS.light : COLORS.dark} size={25} />
            ) : (
              <Eye color={isDark ? COLORS.light : COLORS.dark} size={25} />
            )
          }
        />
      )}
    </Stack>
  );
};
