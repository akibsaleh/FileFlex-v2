'use client';

import { addFiles, getAllFiles } from '@/lib/features/filesSlice';
import {
  AccessTime,
  AppRegistration,
  DeleteOutline,
  Edit,
  InsertDriveFileOutlined,
  Pageview,
  PersonOutline,
  StorageRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PdfCardMedia from './PdfCardMedia';

type File = {
  id: string;
  userId: string;
  email: string;
  url: string;
  fileType: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
};

const FileList = ({ files }: { files: File[] }) => {
  const dispatch = useDispatch();
  const allFiles = useSelector(getAllFiles);
  const loadFiles = React.useCallback(() => {
    dispatch(addFiles(files));
  }, [dispatch, files]);

  React.useEffect(() => {
    return () => {
      loadFiles();
    };
  }, [loadFiles]);

  if (files.length === 0) return <Typography>No file found</Typography>;
  return (
    <Box
      component='section'
      display='flex'
      flexDirection='column'
      width='100%'
      py={4}
    >
      <Grid container spacing={2}>
        {allFiles.length > 0 &&
          allFiles.map((file) => (
            <Grid key={file.id} item xs={3}>
              <Card sx={{ maxWidth: 400 }}>
                <CardActionArea>
                  {file.fileType === 'image' && (
                    <CardMedia
                      component='img'
                      height='200'
                      sx={{ maxHeight: 200 }}
                      image={file.url}
                      alt={file.fileName}
                    />
                  )}
                  {file.fileType === 'pdf' && (
                    <PdfCardMedia pdfUrl={file.url} />
                  )}
                </CardActionArea>
                <CardContent>
                  <Stack direction='column' gap={1}>
                    <Stack
                      direction='row'
                      gap={1}
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Typography
                        gutterBottom
                        variant='h5'
                        fontSize={18}
                        component='div'
                      >
                        {file.fileName.substring(0, 20)}
                        {file.fileName.length > 20 ? '...' : ''}
                      </Typography>
                      <IconButton sx={{ p: 1 }}>
                        <Edit fontSize='small' />
                      </IconButton>
                    </Stack>
                    <Stack
                      gap={1}
                      direction='row'
                      justifyContent='space-between'
                    >
                      <Typography
                        variant='body2'
                        color='text.primary'
                        display='flex'
                        alignItems='center'
                        gap={0.5}
                      >
                        <PersonOutline fontSize='small' /> {file.email}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.primary'
                        display='flex'
                        alignItems='center'
                        gap={0.5}
                      >
                        <AccessTime fontSize='small' />{' '}
                        {new Date(file.updatedAt).toLocaleDateString('en-GB')}
                      </Typography>
                    </Stack>
                    <Stack
                      gap={1}
                      direction='row'
                      justifyContent='space-between'
                    >
                      <Typography
                        variant='body2'
                        color='text.primary'
                        display='flex'
                        alignItems='center'
                        gap={0.5}
                      >
                        <InsertDriveFileOutlined fontSize='small' />{' '}
                        {file.fileType}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.primary'
                        display='flex'
                        alignItems='center'
                        gap={0.5}
                      >
                        <StorageRounded fontSize='small' />{' '}
                        {(file.fileSize / 1000000).toFixed(2)} mb
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
                <Divider />
                <CardActions>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    width='100%'
                  >
                    <Button
                      sx={{ dispaly: 'flex', alignItems: 'center', gap: 1 }}
                      LinkComponent={Link}
                      href={`/editor/${file.id}`}
                    >
                      <AppRegistration fontSize='medium' />
                      <Typography variant='body2'>Editor</Typography>
                    </Button>
                    <Button
                      LinkComponent={Link}
                      href={`/preview/${file.id}`}
                      target='_blank'
                    >
                      <Pageview fontSize='medium' />
                      <Typography variant='body2'>View</Typography>
                    </Button>
                    <Button>
                      <DeleteOutline fontSize='medium' />
                      <Typography variant='body2'>Delete</Typography>
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default FileList;
