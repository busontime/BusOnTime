import React, { useState, useEffect } from 'react';
import { YStack, Adapt, Select, Sheet, Label, H3 } from 'tamagui';

import { Check, ChevronDown } from 'lucide-react-native';

import { useThemeContext } from '@/contexts/theme';

import { COLORS } from '@/constants/styles';

export const FormSelect = ({
  label = '',
  placeholder = '',
  value = null,
  onValueChange = (val) => {},
  options = [],
  w = '$20',
  emptyListMessage = 'Lista Vacía',
}) => {
  const { isDark } = useThemeContext();

  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, [value]);

  return (
    <YStack>
      {label && <Label>{label}</Label>}
      {render && (
        <Select value={value} onValueChange={onValueChange} disablePreventBodyScroll>
          <Select.Trigger width={w} iconAfter={<ChevronDown size={22} />}>
            <Select.Value placeholder={placeholder} color={'$color'} />
          </Select.Trigger>

          <Adapt when='sm' platform='touch'>
            <Sheet
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: 'spring',
                damping: 20,
                mass: 1.2,
                stiffness: 250,
              }}>
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>

              <Sheet.Overlay
                animation='bouncy'
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>

          <Select.Content zIndex={100}>
            <Select.Viewport
              animation='quick'
              animateOnly={['transform', 'opacity']}
              enterStyle={{ o: 0, y: -10 }}
              exitStyle={{ o: 0, y: 10 }}
              minWidth={200}>
              {options.length <= 0 && (
                <H3 ta='center' p='$6' color={'$color'}>
                  {emptyListMessage}
                </H3>
              )}

              {options.map((item, i) => (
                <Select.Item index={i} key={i} value={item.id} paddingHorizontal='$5'>
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check size={24} color={isDark ? COLORS.light : COLORS.dark} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select>
      )}
    </YStack>
  );
};
