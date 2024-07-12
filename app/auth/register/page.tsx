import RegisterForm from '@/components/auth/RegisterForm';
import RegisterBanner from '@/public/register-banner.jpg';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';

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
          src={RegisterBanner}
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
          <RegisterForm />
        </Box>
      </Stack>
    </Box>
  );
}
