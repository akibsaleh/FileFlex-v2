import LoginBanner from '@/public/login-banner.jpg';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import LoginForm from '../../../components/auth/LoginForm';

export default async function page() {
  return (
    <Box component='main' p={5} height='100%'>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        flexGrow={1}
        width='100%'
        height='100%'
        bgcolor='background.paper'
        overflow='hidden'
        borderRadius='10px'
      >
        <Image
          src={LoginBanner}
          alt='Login Banner'
          width={1280}
          height={1917}
          className='w-1/2 h-full object-cover'
        />
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='50%'
          height='100%'
        >
          <LoginForm />
        </Box>
      </Stack>
    </Box>
  );
}
