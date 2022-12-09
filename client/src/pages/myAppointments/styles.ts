import { css } from '@emotion/react';

const signInPage = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#3D0C11',
});

const frame = css({
  height: '85%',
  width: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '40px',
  backgroundColor: '#ebebeb',
  padding: '45px',
});

const styles = {
  signInPage,
  frame,
};

export default styles;
