/** @jsxImportSource @emotion/react */
import React from 'react';
import { MainRouter } from 'routers';
import { Box } from '@mui/material';
import styles from './styles';

export function MainLayout() {
  return (
    <Box css={styles.mainLayout}>
      <Box css={styles.main}>
        <MainRouter />
      </Box>
    </Box>
  );
}
