'use client';
import { RotateLeft, ZoomIn, ZoomOut } from '@mui/icons-material';
import { Box, IconButton, Paper } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from 'react-zoom-pan-pinch';

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <Box
      display='flex'
      alignItems='center'
      gap={0.5}
      zIndex={100}
      sx={{ position: 'absolute', top: 10, left: 10 }}
    >
      <IconButton
        color='secondary'
        sx={{ backgroundColor: '#00000070' }}
        size='small'
        onClick={() => zoomIn()}
      >
        <ZoomIn fontSize='small'></ZoomIn>
      </IconButton>
      <IconButton
        color='secondary'
        sx={{ backgroundColor: '#00000070' }}
        size='small'
        onClick={() => zoomOut()}
      >
        <ZoomOut fontSize='small'></ZoomOut>
      </IconButton>
      <IconButton
        color='secondary'
        sx={{ backgroundColor: '#00000070' }}
        size='small'
        onClick={() => resetTransform()}
      >
        <RotateLeft fontSize='small'></RotateLeft>
      </IconButton>
    </Box>
  );
};

const ImagePreview = ({ url, fileName }: { url: string; fileName: string }) => {
  const [loading, setLoading] = React.useState(true);
  const [imageSize, setImageSize] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 1000,
    height: 1000,
  });

  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      justifyContent='center'
      position='relative'
    >
      <Paper
        sx={{
          overflow: 'hidden',
          borderRadius: 1,
          border: '2px solid #e3e3e3',
          position: 'relative',
          maxWidth: '100%',
          width: imageSize.width,
          height: imageSize.height,
          visibility: !loading ? 'visible' : 'hidden',
        }}
        elevation={2}
      >
        <TransformWrapper initialScale={1}>
          <Controls />
          <TransformComponent>
            <Image
              src={url}
              width={imageSize.width}
              height={imageSize.height}
              alt={fileName}
              onLoad={({ target }) => {
                const { naturalWidth, naturalHeight } =
                  target as HTMLImageElement;
                setLoading(false);
                setImageSize({ width: naturalWidth, height: naturalHeight });
              }}
              style={{
                width: 'auto',
                height: 'auto',
              }}
              className='duration-200'
              priority
            />
          </TransformComponent>
        </TransformWrapper>
        <Image
          src={url}
          width={imageSize.width}
          height={imageSize.height}
          alt={fileName}
          onLoad={({ target }) => {
            const { naturalWidth, naturalHeight } = target as HTMLImageElement;
            setLoading(false);
            setImageSize({ width: naturalWidth, height: naturalHeight });
          }}
          style={{
            width: 'auto',
            height: 'auto',
          }}
          className='duration-200'
          priority
        />
      </Paper>
    </Box>
  );
};

export default ImagePreview;
