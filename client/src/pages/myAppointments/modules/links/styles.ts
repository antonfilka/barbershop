import { css } from '@emotion/react';
import { theme } from 'styles';

const container = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '550px',
  marginTop: '30px',
});

const signUpContainer = css({});

const link = css({
  position: 'relative',
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
});

const styles = {
  container,
  link,
  signUpContainer,
};

export default styles;
