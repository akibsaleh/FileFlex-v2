import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StoreProvider from '@/components/StoreProvider';
import { Box } from '@mui/material';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Box
        component='main'
        display='flex'
        bgcolor='Background'
        flexDirection='column'
        sx={{ width: '100%', height: '100%', minHeight: '100vh' }}
      >
        <Header color='primary' elevation={1} />
        {children} <Footer />
      </Box>
    </StoreProvider>
  );
}
