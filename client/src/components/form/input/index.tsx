import React, { InputHTMLAttributes } from 'react';
import { Box, TextField } from '@mui/material';

import styles from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { errorMsg } = props;

  return (
    <Box css={styles.wrapperStyles}>
      <TextField required label="Required" defaultValue="Hello World" />
      <p css={styles.paragraphErrorStyles}>{errorMsg}</p>
    </Box>
  );
});
