import Header from '@/components/Header';
import { Alert, Box, Container } from '@mui/material';
import getSingleFile from '../../../../actions/getSingleFile.action';
import ImagePreview from '../../../../components/FileManagement/ImagePreview';
import PdfPreview from '../../../../components/FileManagement/PdfPreview';

export default async function page({ params }: { params: { id: string } }) {
  const file = await getSingleFile(params.id);
  return (
    <Box
      component='main'
      width='100%'
      height='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Header color='primary' elevation={1} />
      <Container
        component='section'
        maxWidth='xl'
        sx={{ py: 4, height: '100%', maxHeight: 1200 }}
      >
        {!file.status && (
          <Box display='flex' justifyContent='center'>
            <Alert severity='error' sx={{ maxWidth: 640 }}>
              {file.message}
            </Alert>
          </Box>
        )}
        {file.data?.fileType === 'image' && (
          <ImagePreview url={file.data.url} fileName={file.data.fileName} />
        )}
        {file.data?.fileType === 'pdf' && (
          <PdfPreview url={file.data.url} fileName={file.data.fileName} />
        )}
      </Container>
    </Box>
  );
}
