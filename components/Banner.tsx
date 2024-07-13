import backgroundImg from '@/public/banner-fileflex.jpg'; // Replace with your background image
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const Banner = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0)',
        backgroundImage: `url(${backgroundImg.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        flexGrow: 1,
      }}
    >
      <Container maxWidth='md'>
        <Grid container direction='column' alignItems='center' spacing={4}>
          <Grid item>
            <Typography
              variant='h1'
              sx={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                color: 'text.primary',
              }}
            >
              Get Started Today!
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='h6'
              sx={{
                fontSize: '1.5rem',
                color: 'text.primary',
              }}
            >
              Upload and store your image and pdf files. Draw on your images and
              download
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              LinkComponent={Link}
              href='/auth/login'
              sx={{
                backgroundColor: 'secondary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
