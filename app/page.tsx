import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box
      component='main'
      height='100%'
      minHeight='100vh'
      className='text-center'
      display='flex'
      flexDirection='column'
    >
      <Header />
      <Banner />
      <Footer />
    </Box>
  );
}
