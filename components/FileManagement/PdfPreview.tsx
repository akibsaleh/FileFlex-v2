'use client';
'use client';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import TailLoaderIcon from '../icons/TailLoaderIcon';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfPreview = ({ url, fileName }: { url: string; fileName: string }) => {
  const [file, setFile] = React.useState<Blob | null>(null);
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
    }
  };

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => setFile(blob));
  }, [url]);

  if (!file)
    return (
      <Typography>
        <TailLoaderIcon color='#0b3c5d' size='72' />
      </Typography>
    );
  return (
    <Box
      position='relative'
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{ width: '100%' }}
    >
      <nav
        style={{
          width: '100%',
          maxWidth: '640px',
          minHeight: 38,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#252422b0',
          zIndex: 100,
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <Button variant='contained' color='secondary' onClick={goToPrevPage}>
          <ChevronLeft />
        </Button>
        <Typography
          variant='body1'
          color='#ffffff'
          component='span'
          sx={{ mx: 2 }}
        >
          Page {pageNumber} of {numPages}
        </Typography>
        <Button variant='contained' color='secondary' onClick={goToNextPage}>
          <ChevronRight />
        </Button>
      </nav>
      <Typography variant='h5' color='#0b3c5d' sx={{ marginTop: 1.5 }}>
        {fileName}
      </Typography>
      <Stack alignItems='center' sx={{ width: '100%', marginTop: 1.5 }}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width={640} />
        </Document>
      </Stack>
    </Box>
  );
};

export default PdfPreview;
