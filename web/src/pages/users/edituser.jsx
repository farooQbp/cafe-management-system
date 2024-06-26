import React, { useContext, useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SendIcon from '@mui/icons-material/Send';
import useStyles from './styles';
import cafeManagement from '../../store/cafe';
import TextInput from '../../components/textinput';
import CustomDropdown from '../../components/dropdown';
import CustomButton from '../../components/button';
import PAYLOAD_SAMPLE from '../../core/config/payload';

const EditUser = () => {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id: 0,
  });
  const [formResetData, setFormResetData] = useState({
    name: '',
    email: '',
    id: 0,
  });
  const [formError, setFormError] = useState({
    name: false,
    email: false,
  });

  const cafeStore = useContext(cafeManagement);

  const fetchUsers = async () => {
    const response = await cafeStore.fetchUsers();
    if (response && response.data) {
      const users = response.data.map((item) => ({ email: item.USER_EMAIL, value: item.USER_ID, label: item.USER_NAME }))
      if (users.length) {
        setFormData({
          name: users[0].label,
          email: users[0].email,
          id: users[0].value,
        });
        setFormResetData({
          name: users[0].label,
          email: users[0].email,
          id: users[0].value,
        });
        setUser(users);
      }
    }
  }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [])

  const handleUserChange = (e) => {
    const selectedUser = user.filter((item) => (item.value === e.target.value))
    if (selectedUser.length) {
      setFormData({
        name: selectedUser[0].label,
        email: selectedUser[0].email,
        id: selectedUser[0].value,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // email validation
    if (name === 'email' && value !== '') {
      setFormError({
        ...formError,
        [name]: !/^[A-Za-z0-9.]{1,30}@[A-Za-z]{2,20}\.[A-Za-z]{2,20}$/.test(value),
      });
    } else if (name === 'email' && value === '') {
      setFormError({
        ...formError,
        [name]: false,
      });
    }

    // name validation
    if (name === 'name' && value !== '') {
      setFormError({
        ...formError,
        [name]: !/^[A-Za-z\s]{1,20}$/.test(value),
      });
    } else if (name === 'name' && value === '') {
      setFormError({
        ...formError,
        [name]: false,
      });
    }
  };

  const handleReset = () => {
    setFormData(formResetData)
  }

  const handleSubmit = async (e) => {
    if (Object.values(formData).includes('')) {
      cafeStore.handleSnackBar('warning', 'Fields should not be empty')
      return;
    } else if (Object.values(formError).includes(true)) {
      cafeStore.handleSnackBar('error', 'Invalid Entry')
      return;
    } else {
      let payload = {
        ...PAYLOAD_SAMPLE.ADD_USER,
        ...formData
      }
      payload = { name: formData.name, email: formData.email }
      const response = await cafeStore.updateUser(formData.id, payload);
      if (response.status === 200) {
        cafeStore.handleSnackBar('success', response.data)
      } else cafeStore.handleSnackBar('error', "Update failed!")
      handleReset();
    }
  };

  return (
    <div className={classes.pageContainer}>
      <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginY: '0px' }}>
        <div className={classes.formControl}>
          <div className={classes.formSelectControl}>
            <CustomDropdown
              name="user"
              id="selectUser"
              value={formData.id}
              onChange={handleUserChange}
              label="Select User"
              options={user}
              error={formError.id}
            />
          </div>
        </div>
        <form className={classes.formContainer}>
          <Stack direction="column" spacing={2} width='80%'>
            <Stack direction="row" spacing={2}>
              <TextInput
                name="name"
                id="username"
                value={formData.name}
                onChange={handleChange}
                label="Name"
                type='text'
                error={formError.name}
              />
              <TextInput
                name="email"
                id="useremail"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                type='email'
                error={formError.email}
              />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent='center'>
              <CustomButton onClick={handleReset} className={classes.button} variant='outlined' startIcon={<BackspaceIcon />} >Discard Changes</CustomButton>
              <CustomButton onClick={handleSubmit} className={classes.button} variant='contained' endIcon={<SendIcon />} >Update User</CustomButton>
            </Stack>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default EditUser;
