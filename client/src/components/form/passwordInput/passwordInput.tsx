/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FieldValues } from 'react-hook-form/dist/types';
import styles from './styles';

interface PasswordInputProps {
  errorMsg: string | undefined;
  field: FieldValues;
  clickHandler: () => void;
  showPassword: boolean;
  label?: string;
  twoParts?: boolean;
}

export function PasswordInput(props: PasswordInputProps) {
  const { errorMsg, field, clickHandler, showPassword, label, twoParts } = props;

  return (
    <div css={styles.passwordInput}>
      <FormControl sx={{ m: '1 0', width: '100%' }} variant="standard">
        <InputLabel htmlFor="my-input" error={!!errorMsg}>
          {label || 'Password *'}
        </InputLabel>
        <Input
          id="my-input"
          type={showPassword ? 'text' : 'password'}
          autoComplete="off"
          onChange={(e) => field.onChange(e)}
          value={field.value || ''}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={clickHandler}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormHelperText
        error={!!errorMsg}
        sx={{
          width: twoParts ? '266px' : '100%',
        }}>
        {errorMsg}
      </FormHelperText>
    </div>
  );
}
