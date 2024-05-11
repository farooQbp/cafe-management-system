import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const TextInput = (props) => {
    const {
        value,
        onChange,
        label,
        id,
        name,
        isPassword,
        type,
        error,
    } = props;

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        isPassword ? (
            <TextField
                fullWidth
                name={name}
                id={id}
                label={label}
                type={showPassword ? 'text' : 'password'}
                error={error}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                  }}
                variant="outlined"
                value={value}
                onChange={onChange}
                helperText={error ? "Should not be empty" : ""}
            />
        ) : (
            <TextField
                fullWidth
                name={name}
                id={id}
                label={label}
                type={type}
                variant="outlined"
                value={value}
                onChange={onChange}
                error={error}
                helperText={error ? "Incorrect entry" : ""}
            />
        )
    )
}

export default TextInput