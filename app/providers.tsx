'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

export const Providers = ({ children, session }: { children: React.ReactNode, session: any }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
      </Provider>
    </SessionProvider>
  );
};
