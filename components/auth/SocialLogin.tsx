'use client';
import { Google } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';

const SocialLogin = () => {
  const handleSocialLogin = async () => {
    await signIn('google');
  };
  return (
    <Button
      variant='outlined'
      size='large'
      color='primary'
      fullWidth
      sx={{ height: 48 }}
      onClick={handleSocialLogin}
    >
      <Google />
      <Typography ml={1}>Log in with Google</Typography>
    </Button>
  );
};

export default SocialLogin;
