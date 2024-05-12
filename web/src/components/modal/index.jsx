import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'white',
    padding: theme.spacing(2),
    outline: 'none',
  },
}));

const CustomModal = ({ open, onClose, children }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modal}
      disableAutoFocus
      disableEnforceFocus
      disableBackdropClick
    >
      <Paper className={classes.paper}>
        {children}
      </Paper>
    </Modal>
  );
};

export default CustomModal;
