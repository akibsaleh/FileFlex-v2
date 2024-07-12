'use client';
import { Logout } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';

const LogoutButton = ({ color }: { color?: 'primary' | 'transparent' }) => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <Button
      variant='contained'
      disableElevation={true}
      color={color === 'primary' ? 'secondary' : 'primary'}
      size='medium'
      onClick={handleLogout}
    >
      <Logout fontSize='small' />
      <Typography
        ml={1}
        fontSize={16}
        fontWeight={500}
        textTransform='capitalize'
      >
        Logout
      </Typography>
    </Button>
  );
};

export default LogoutButton;
