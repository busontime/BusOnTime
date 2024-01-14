import React, { useState, useEffect } from 'react';
import { Platform, Modal } from 'react-native';
import { YStack, Input, Button, Label, XStack, Stack } from 'tamagui';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPicker from 'react-native-wheel-color-picker';

import { Eye, EyeOff } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { ModalButtons } from '../modalButtons';

import { COLORS } from '@/constants/styles';

export const FormInput = ({
  label = '',
  placeholder = '',
  value = '',
  onChangeText = (val) => {},
  type = 'default',
  isSecure = false,
  disabled = false,
  editable = true,
  w = '$20',

  // for Date
  isDate = false,
  dateValue = new Date(),

  // for Color
  isColor = false,

  // for press
  onPress = () => {},
}) => {
  const { isDark } = useThemeContext();

  const [field, setField] = useState(value);
  const [showPassword, setShowPassword] = useState(isSecure);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const changeField = (value) => {
    setField(value);
    onChangeText(value);
  };

  const handlerClick = () => {
    if (isDate) {
      setShowDatePicker(true);
    } else if (isColor) {
      setShowColorPicker(true);
    }
  };

  const handlerDatePicker = (_, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    const formattedDate = selectedDate.toLocaleDateString('es-ES');
    setField(formattedDate);
    onChangeText(selectedDate);
  };

  const closeColorPciker = () => {
    changeField('');
    setShowColorPicker(false);
  };

  useEffect(() => {
    if (isDate) {
      const formattedDate = dateValue.toLocaleDateString('es-ES');
      setField(formattedDate);
    }
  }, [dateValue]);

  useEffect(() => {
    if (!isDate) {
      setField(value);
    }
  }, [value]);

  return (
    <YStack bg={'$colorTransparent'} onPress={handlerClick}>
      {label && <Label>{label}</Label>}
      <XStack space={isColor ? '$3' : '$0'}>
        <Input
          placeholder={placeholder}
          value={field}
          onFocus={onPress}
          onChangeText={changeField}
          keyboardType={type}
          secureTextEntry={showPassword}
          disabled={disabled}
          editable={editable}
          w={w}
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

        {isColor && (
          <Stack
            bg={field !== '' ? field : COLORS.light}
            borderRadius={'$5'}
            w='$4'
            height={'$3.5'}
          />
        )}
      </XStack>

      {isDate && showDatePicker && (
        <DateTimePicker value={dateValue} onChange={handlerDatePicker} />
      )}

      {isColor && showColorPicker && (
        <Modal animationType='fade' transparent visible={showColorPicker}>
          <YStack flex={1} bg={'$gray5'} paddingHorizontal='$5' space='$10'>
            <ColorPicker
              row={false}
              gapSize={20}
              color={field}
              thumbSize={30}
              sliderSize={25}
              onColorChange={changeField}
            />

            <ModalButtons
              firstButtonAction={closeColorPciker}
              secondButtonAction={() => {
                setShowColorPicker(false);
              }}
            />
          </YStack>
        </Modal>
      )}
    </YStack>
  );
};
