/** @jsxImportSource @emotion/react */
import { Box, Link, Typography } from '@mui/material';
import { APP_ROUTES } from 'constants/';
import { theme } from '../../../../styles';
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
      <Box css={styles.signUpContainer}>
        <Typography variant="inherit" color="textSecondary" sx={{ mr: '20px' }}>
          Going back to home page?
        </Typography>
        <Link
          href={APP_ROUTES.MAIN}
          sx={{
            position: 'relative',
            right: 0,
            textDecoration: 'none',
            color: theme.palette.text.primary,
            transition: '0.5s',
            '&:hover': { color: theme.palette.primary.main },
            '&:before': {
              content: "''",
              position: 'absolute',
              width: '0',
              height: '2px',
              bottom: '-7px',
              left: '50%',
              transform: 'translate(-50%,0%)',
              backgroundColor: theme.palette.primary.main,
              visibility: 'hidden',
              transition: 'all 0.3s ease-in-out',
            },
            '&:hover:before': {
              visibility: 'visible',
              width: '100%',
            },
          }}>
          Go Home
        </Link>
      </Box>
    </div>
  );
}
