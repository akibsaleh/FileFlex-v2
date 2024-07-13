import getSingleFile from '@/actions/getSingleFile.action';
import KonvaStage from '@/components/Editor/KonvaStage';
import { Alert, Box } from '@mui/material';

const page = async ({ params }: { params: { id: string } }) => {
  const file = await getSingleFile(params.id);
  return (
    <Box
      component='section'
      width='100%'
      minHeight='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      pb={5}
    >
      {!file.status && (
        <Box my={5} sx={{ width: '100%', maxWidth: '640px' }}>
          <Alert severity='error'>{file.message}</Alert>
        </Box>
      )}
      <KonvaStage
        fileName={
          file.data?.fileType === 'image' ? file.data.fileName : 'newFile.png'
        }
        imageUrl={file.data?.fileType === 'image' ? file.data.url : undefined}
      />
    </Box>
  );
};

export default page;
