import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ children, onClick, variant, disabled, startIcon, endIcon, color, border }) => {

  return (
    <Button size='medium' color={color || 'secondary'} onClick={onClick} variant={variant} disabled={disabled} disableElevation disableRipple startIcon={startIcon} endIcon={endIcon} sx={{ border: border && `1px solid ${color || "secondary"}` }}>
      {children}
    </Button>
  );
};

export default CustomButton;
