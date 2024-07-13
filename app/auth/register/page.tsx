import RegisterForm from '@/components/auth/RegisterForm';
import RegisterBanner from '@/public/register-banner.jpg';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';

export default async function page() {
  return (
    <Box
      component='main'
      p={5}
      height='100%'
      minHeight='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        flexGrow={1}
        width='100%'
        maxWidth={1024}
        height='100%'
        maxHeight='720px'
        bgcolor='background.paper'
        overflow='hidden'
        borderRadius='10px'
        sx={{ flexGrow: 1 }}
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='50%'
          height='100%'
          position='relative'
        >
          <Image
            src={RegisterBanner}
            alt='Register Banner'
            width={1280}
            height={600}
            className='w-full h-full object-cover'
          />
        </Box>
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
