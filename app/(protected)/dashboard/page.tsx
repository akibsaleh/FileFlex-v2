import getFiles from '@/actions/getFiles.action';
import FileList from '@/components/FileManagement/FileList';
import FileUploader from '@/components/FileManagement/FileUploader';
import Header from '@/components/Header';
import { Box, Container, Typography } from '@mui/material';

export default async function page() {
  const files = await getFiles();
  const serializedFiles = files.data?.map((file) => ({
    ...file,
    createdAt: file.createdAt.toISOString(),
    updatedAt: file.updatedAt.toISOString(),
  }));

  return (
    <Box
      component='main'
      display='flex'
      bgcolor='Background'
      flexDirection='column'
      sx={{ width: '100%', height: '100%' }}
    >
      <Header color='primary' elevation={1} />
      <Container maxWidth='xl' component='section'>
        <Box py={3}>
          <FileUploader />
          <Typography>{!files.status && files.message}</Typography>
          <FileList files={files.status ? serializedFiles : []} />
        </Box>
      </Container>
    </Box>
  );
}
