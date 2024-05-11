import React from 'react';
import Button from '@mui/material/Button';
import useStyles from './style';

const CustomButton = ({ children, onClick }) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
