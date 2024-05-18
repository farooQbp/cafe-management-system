import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ children, onClick, variant, disabled, startIcon, endIcon, color, border, fullWidth }) => {

  return (
    <Button fullWidth={fullWidth} size='medium' color={color || 'secondary'} onClick={onClick} variant={variant} disabled={disabled} disableElevation  disableTouchRipple disableRipple disableFocusRipple startIcon={startIcon} endIcon={endIcon} sx={{ border: border && `1px solid ${color || "secondary"}` }}>
      {children}
    </Button>
  );
};

export default CustomButton;
