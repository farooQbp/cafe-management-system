import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

dayjs.extend(utc);

const CustomDateTimePicker = (props) => {
    const {
        label,
        value,
        onChange,
        isDisabled
    } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    label={label}
                    value={dayjs.utc(value)}
                    disabled={isDisabled}
                    disableFuture
                    onChange={onChange}
                    closeOnSelect
                    format='DD-MM-YYYY'
                    slotProps={{
                        textField: {
                            helperText: 'DD-MM-YYYY',
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default CustomDateTimePicker;
