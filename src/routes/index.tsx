import React, { useState, Fragment, useEffect } from 'react';

import { PublicRouter } from './public';
import { AdminRouter } from './admin';
import { DriverRouter } from './driver';
import { PassengerRouter } from './passenger';

import { useAuthContext } from '@/contexts/auth';

export const AppRouter = (): JSX.Element => {
  const [router, setRouter] = useState('');

  const { user } = useAuthContext();

  const configRouter = () => {
    if (user === null || user === undefined) {
      setRouter('public');
    } else if (user.email === 'admin@busontime.com') {
      setRouter('admin');
    } else if (user.email === 'driver@busontime.com') {
      setRouter('driver');
    } else if (user.email === 'passenger@busontime.com') {
      setRouter('passenger');
    } else {
      setRouter('passenger');
    }
  };

  useEffect(() => {
    configRouter();
  }, [user]);

  return (
    <Fragment>
      {router === 'public' && <PublicRouter />}
      {router === 'admin' && <AdminRouter />}
      {router === 'driver' && <DriverRouter />}
      {router === 'passenger' && <PassengerRouter />}
    </Fragment>
  );
};
