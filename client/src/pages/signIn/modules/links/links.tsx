/** @jsxImportSource @emotion/react */
import { Box, Link, Typography } from '@mui/material';
import { APP_ROUTES } from 'constants/';
import styles from './styles';

export function Links() {
  return (
    <div css={styles.container}>
      <Box css={styles.signUpContainer}>
        <Typography variant="inherit" color="textSecondary" sx={{ mr: '20px' }}>
          Need an account?
        </Typography>
        <Link href={APP_ROUTES.SIGN_UP} css={styles.link}>
          Sign up
        </Link>
      </Box>
    </div>
  );
}
