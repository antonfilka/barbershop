/** @jsxImportSource @emotion/react */
import { HeaderTitle } from 'components';
import { SignUpForm } from './modules';
import styles from './styles';

export function SignUpPage() {
  return (
    <div css={styles.signUpPage}>
      <HeaderTitle text="REGISTRATION" />
      <SignUpForm />
    </div>
  );
}
