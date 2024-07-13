import getFiles from '@/actions/getFiles.action';
import FileList from '@/components/FileManagement/FileList';
import FileUploader from '@/components/FileManagement/FileUploader';
import { Box, Container, Typography } from '@mui/material';

export interface File {
  id: string;
  userId: string;
  email: string;
  url: string;
  fileType: string;
  fileName: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function page() {
  const files = await getFiles();
  const serializedFiles = files.data?.map((file: File) => ({
    ...file,
    createdAt: file.createdAt.toISOString(),
    updatedAt: file.updatedAt.toISOString(),
  }));

  return (
    <Container
      maxWidth='xl'
      component='section'
      sx={{ height: '100%', flexGrow: 1 }}
    >
      <Box py={3} display='flex' flexDirection='column' height='100%'>
        <FileUploader />
        <Typography>{!files.status && files.message}</Typography>
        <FileList files={files.status ? serializedFiles : []} />
      </Box>
    </Container>
  );
}
