import PasswordResetForm from '@/components/auth/PasswordResetForm';
import { Box, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import LogoIcon from '../../../components/icons/LogoIcon';

export default function page() {
  return (
    <Box
      component='main'
      height='100%'
      width='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <IconButton LinkComponent={Link} href='/'>
        <LogoIcon size='40' />
        <Typography
          textTransform='uppercase'
          fontSize={32}
          fontWeight={900}
          letterSpacing={2}
          ml={1}
        >
          FileFlex
        </Typography>
      </IconButton>
      <PasswordResetForm />
    </Box>
  );
}
