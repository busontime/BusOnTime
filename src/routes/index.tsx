import React, { useState, useEffect, Fragment } from 'react';

import { PublicRouter } from './public';
import { AdminRouter } from './admin';
import { DriverRouter } from './driver';
import { PassengerRouter } from './passenger';

import { useAuthContext } from '@/contexts/auth';

import { ROLES_ID, ROUTERS } from '@/constants/bd';

export const AppRouter = () => {
  const [router, setRouter] = useState('');

  const { profile } = useAuthContext();

  const configRouter = () => {
    if (profile) {
      const { person, user } = profile;

      if (user === null || user === undefined) {
        setRouter(ROUTERS.public);
        return;
      }

      const { roleId } = person;

      switch (roleId) {
        case ROLES_ID.passenger:
          setRouter(ROUTERS.passenger);
          break;
        case ROLES_ID.driver:
          setRouter(ROUTERS.driver);
          break;
        case ROLES_ID.admin:
          setRouter(ROUTERS.admin);
          break;
        default:
          setRouter(ROUTERS.public);
          break;
      }
    }
  };

  useEffect(() => {
    configRouter();
  }, [profile]);

  return (
    <Fragment>
      {router === ROUTERS.admin ? (
        <AdminRouter />
      ) : router === ROUTERS.driver ? (
        <DriverRouter />
      ) : router === ROUTERS.passenger ? (
        <PassengerRouter />
      ) : (
        <PublicRouter />
      )}
    </Fragment>
  );
};
