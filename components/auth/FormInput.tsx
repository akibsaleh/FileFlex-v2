'use client';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
interface Props {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  isDisabled?: boolean;
}
const FormInput = ({ name, label, type, isDisabled }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          type={type}
          fullWidth
          variant='outlined'
          error={!!error}
          helperText={error ? error.message : null}
          disabled={isDisabled}
          InputLabelProps={{
            style: {
              color: '#252422',
            },
          }}
          {...field}
        />
      )}
    />
  );
};

export default FormInput;
