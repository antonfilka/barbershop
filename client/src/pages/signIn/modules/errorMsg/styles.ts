import { css } from '@emotion/react';

const errorMsg = css({
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  zIndex: 100,
  justifySelf: 'flex-end',
  alignSelf: 'flex-end',
});

const styles = {
  errorMsg,
};

export default styles;
