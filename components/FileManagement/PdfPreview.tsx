'use client';
'use client';
import { Box, Stack, Typography } from '@mui/material';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const PdfPreview = ({ url, fileName }: { url: string; fileName: string }) => {
  return (
    <Box
      position='relative'
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{ width: '100%' }}
    >
      <Typography variant='h5' color='#0b3c5d' sx={{ marginTop: 1.5 }}>
        {fileName}
      </Typography>
      <Stack alignItems='center' sx={{ width: '100%', marginTop: 1.5 }}>
        <iframe
          src={url}
          width='1024'
          height='960'
          frameBorder='0'
          scrolling='auto'
        />
      </Stack>
    </Box>
  );
};

export default PdfPreview;
