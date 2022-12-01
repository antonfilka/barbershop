/** @jsxImportSource @emotion/react */
import { HeaderTitle } from 'components';
import { useState } from 'react';
import { SignInForm, Links, ErrorMsg } from './modules';
import styles from './styles';

export function SignInPage() {
  const [errorMessage, setErrorMessage] = useState({
    wrongPass: false,
    notFound: false,
    notConfirmed: false,
    rejected: false,
  });

  return (
    <div css={styles.signInPage}>
      <HeaderTitle text="AUTHORIZATION" />
      <SignInForm setErrorMessage={setErrorMessage} />
      <Links />
      {errorMessage.wrongPass && <ErrorMsg errorType="wrongPass" />}
      {errorMessage.notFound && <ErrorMsg errorType="notFound" />}
      {errorMessage.notConfirmed && <ErrorMsg errorType="notConfirmed" />}
      {errorMessage.rejected && <ErrorMsg errorType="rejected" />}
    </div>
  );
}
