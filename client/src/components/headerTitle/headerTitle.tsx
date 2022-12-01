/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '@mui/material';
import styles from './styles';

interface HeaderTitleProps {
  text: string;
}

export function HeaderTitle(props: HeaderTitleProps) {
  const { text } = props;
  return (
    <Typography
      css={styles.headerTitle}
      textAlign="center"
      sx={{
        typography: 'h3',
      }}
      component="div"
      gutterBottom>
      {text}
    </Typography>
  );
}
