import React, { createContext, useContext, useState } from 'react';

import { travelService } from '@/services/travel';

import { type ChildrenProps } from '@/interfaces';

export const TravelContext = createContext(null);

export const useTravelContext = () => useContext(TravelContext);

export const TravelProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [currentTravel, setCurrentTravel] = useState(null);

  const changeCurrentTravel = async (id) => {
    if (id === null || id === undefined) {
      setCurrentTravel(null);
    } else {
      const data = await travelService.getById(id);
      const _data = { ...data._data, id };
      setCurrentTravel(_data);
    }
  };

  const data = {
    currentTravel,
    changeCurrentTravel,
  };

  return <TravelContext.Provider value={data}>{children}</TravelContext.Provider>;
};
