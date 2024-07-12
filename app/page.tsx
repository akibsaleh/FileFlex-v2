import Header from '@/components/Header';
import { Box } from '@mui/material';
import Banner from '../components/Banner';

export default function Home() {
  return (
    <Box component='main' height='100%' className='text-center'>
      <Header />
      <Banner />
    </Box>
  );
}
