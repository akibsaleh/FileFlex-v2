import theme from '@/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import '@uploadthing/react/styles.css';
import 'material-symbols';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import React from 'react';
import { extractRouterConfig } from 'uploadthing/server';
import ClientCacheProvider from './ClientCacheProvider';
import './globals.css';

import { ourFileRouter } from '@/app/api/uploadthing/core';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FileFlex',
  description: 'Advanced File Management and Sketching',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ClientCacheProvider>
          <ThemeProvider theme={theme}>
            <SessionProvider>
              <CssBaseline />
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              {children}
              <Footer />
            </SessionProvider>
          </ThemeProvider>
        </ClientCacheProvider>
      </body>
    </html>
  );
}
