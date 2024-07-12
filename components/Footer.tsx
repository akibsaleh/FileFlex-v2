import { Box, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'secondary.main',
        color: 'text.primary',
        py: 2,
      }}
    >
      <Typography variant='body2'>
        &copy; Copyright {new Date().getFullYear()} | Developed by{' '}
        <Link
          href='https://github.com/akibsaleh'
          color='inherit'
          target='_blank'
          rel='noopener noreferrer'
        >
          Akib Saleh
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
