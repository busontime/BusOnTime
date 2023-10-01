import React from 'react';
import { Button, Stack, Text } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { User2 } from 'lucide-react-native';

export const AdminHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Stack bg={'$backgroundFocus'} f={1} jc='center'>
      <Text ta='center' color={'$color'}>
        Home Admin
      </Text>

      <Button
        icon={<User2 size={48} />}
        variant='outlined'
        backgroundColor='$green8'
        onPress={() => {
          navigation.navigate('profile-menu' as never);
        }}>
        Profile
      </Button>
    </Stack>
  );
};
