'use client';
import { UploadDropzone } from '@/lib/utils/uploadthing';
import { Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addFiles } from '../../lib/features/filesSlice';

const FileUploader = () => {
  const [snack, setSnack] = React.useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const handleClose = () => {
    setSnack({ open: false, message: '' });
  };
  const dispatch = useDispatch();
  return (
    <>
      <UploadDropzone
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          // Do something with the response
          const files = res.map((item) =>
            JSON.parse(item.serverData.uploadedFileOnDB),
          );
          if (files.length > 0) {
            dispatch(addFiles(files));
          }
          setSnack({ open: true, message: 'Files uploaded successfully!' });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          setSnack({ open: true, message: 'Upload failed' });
        }}
      />
      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snack.message}
      />
    </>
  );
};

export default FileUploader;
