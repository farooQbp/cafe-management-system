import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ children, onClick, variant, disabled, startIcon, endIcon }) => {

  return (
    <Button onClick={onClick} variant={variant} disabled={disabled} disableElevation disableRipple startIcon={startIcon} endIcon={endIcon}>
      {children}
    </Button>
  );
};

export default CustomButton;
