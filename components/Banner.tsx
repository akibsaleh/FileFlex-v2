import backgroundImg from '@/public/banner-fileflex.jpg'; // Replace with your background image
import { Box, Button, Container, Grid, Typography } from '@mui/material';

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
              Unlock the power of your data with our advanced analytics tools.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
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
