import React, { useState, Fragment } from 'react';
import { YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';

import { SearchBar } from '@/components/passenger/searchBar';
import { Map } from '@/components/map';
import { BusStopTab } from '@/components/passenger/busStopTab';
import { LineView } from '@/components/passenger/lineView';
import { TabBar } from '@/components/passenger/tabBar';

export const PassengerHomeScreen = () => {
  const navigation = useNavigation();

  const [principalTab, setPrincipalTab] = useState(true);
  const [search, setSearch] = useState('');

  return (
    <YStack f={1} bg={'$backgroundFocus'}>
      <SearchBar
        changeSearchValue={setSearch}
        onPress={() => {
          if (principalTab) {
            navigation.navigate('bus-stop' as never);
          }
        }}
      />

      {principalTab && (
        <Fragment>
          <Map />

          <BusStopTab />
        </Fragment>
      )}

      {!principalTab && <LineView searchValue={search} />}

      <TabBar principalTab={principalTab} setPrincipalTab={setPrincipalTab} />
    </YStack>
  );
};
