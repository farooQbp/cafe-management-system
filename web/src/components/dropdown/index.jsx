import React, { useEffect, useRef, useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import useStyles from './style';

const CustomDropdown = ({ label, value, onChange, options, id, defaultValue, error, name }) => {
  console.log('qqqqqqqqqqqqqqqqqqqqqq', value, defaultValue, options)
  const classes = useStyles();

  const [selectWidth, setSelectWidth] = useState(0);
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      const width = selectRef.current.offsetWidth - 5;
      setSelectWidth(width);
    }
  }, [selectRef]);

  return (
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        name={name}
        onChange={onChange}
        autoWidth
        label={label}
        id={id}
        ref={selectRef}
        error={error}
        defaultValue={defaultValue}
        MenuProps={{
          PaperProps: {
            style: {
              width: selectWidth,
            },
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;