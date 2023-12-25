import React, { useState, Fragment } from 'react';
import { YStack } from 'tamagui';

import { SearchBar } from '@/components/passenger/searchBar';
import { Map } from '@/components/map';
import { BusStopView } from '@/components/passenger/busStopView';
import { LineView } from '@/components/passenger/lineView';
import { TabBar } from '@/components/passenger/tabBar';

export const PassengerHomeScreen = () => {
  const [principalTab, setPrincipalTab] = useState(true);
  const [search, setSearch] = useState('');

  return (
    <YStack f={1} bg={'$backgroundFocus'}>
      <SearchBar changeSearchValue={setSearch} />

      {principalTab && (
        <Fragment>
          <Map />

          <BusStopView searchValue={search} />
        </Fragment>
      )}

      {!principalTab && <LineView searchValue={search} />}

      <TabBar principalTab={principalTab} setPrincipalTab={setPrincipalTab} />
    </YStack>
  );
};
