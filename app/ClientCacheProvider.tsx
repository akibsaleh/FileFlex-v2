'use client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';

const cache = createCache({ key: 'css' });

export default function ClientCacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
