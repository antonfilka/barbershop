import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { FieldValues } from 'react-hook-form';

type TextFieldControlledProps = TextFieldProps & {
  field: FieldValues;
};

export function TextFieldControlled(props: TextFieldControlledProps) {
  const { field, ...rest } = props;
  return (
    <TextField
      onChange={(e) => field.onChange(e)}
      value={field.value || ''}
      {...rest}
      SelectProps={{
        inputProps: { disablePortal: true },
      }}
    />
  );
}
