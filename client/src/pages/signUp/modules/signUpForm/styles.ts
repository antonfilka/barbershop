import { css } from '@emotion/react';

const form = css({
  width: '90%',
  padding: '50px 30px 30px 30px ',
  border: '1px solid rgb(0,0,0,0.1)',
  borderRadius: '9px',
  boxShadow: '0px 2px 27px 1px rgba(34, 60, 80, 0.22)',
  backgroundImage: 'linear-gradient(#004ed7, #004ed7)',
  backgroundSize: '100% 8px',
  backgroundPosition: 'top',
  backgroundRepeat: 'no-repeat',
});

const row = css({
  display: 'flex',
  width: '100%',
  marginBottom: '30px',
});

const buttons = css({
  display: 'flex',
  justifyContent: 'space-around',
});

const passwordInput = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const styles = {
  form,
  row,
  buttons,
  passwordInput,
};

export default styles;
