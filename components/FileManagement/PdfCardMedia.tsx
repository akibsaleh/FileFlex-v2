'use client';
import { CardMedia } from '@mui/material';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfCardMedia = ({ pdfUrl }: { pdfUrl: string }) => {
  const [file, setFile] = React.useState<Blob | null>(null);
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  React.useEffect(() => {
    fetch(pdfUrl)
      .then((res) => res.blob())
      .then((blob) => setFile(blob));
  }, [pdfUrl]);
  return (
    <CardMedia sx={{ maxHeight: 200, overflow: 'hidden' }}>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={1} width={300} />
      </Document>
    </CardMedia>
  );
};

export default PdfCardMedia;
