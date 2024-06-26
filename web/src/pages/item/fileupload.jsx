import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 0,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 0,
});

export default function InputFileUpload({ onClick, name, value, noImage }) {
  return (
    <Stack direction="column" spacing={2} width='80%'>
      <Button
        component="label"
        fullWidth
        name={name}
        role={undefined}
        variant="outline"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onClick={onClick}
      >
        Upload Image
        <VisuallyHiddenInput type="file" />
      </Button>
      {value !== '' && !noImage ? <img src={value} width={60} alt={name} /> : null}
    </Stack>
  );
}
