/** @jsxImportSource @emotion/react */
import { Alert, AlertColor } from '@mui/material';
import styles from './styles';

interface ErrorMessage {
  errorType: 'wrongPass' | 'notFound' | 'notConfirmed' | 'rejected';
}

type ErrorAlert = {
  severity: AlertColor | undefined;
  message: string | undefined;
};

type Errors = {
  wrongPass?: ErrorAlert;
  notFound?: ErrorAlert;
  notConfirmed?: ErrorAlert;
  rejected?: ErrorAlert;
};

export const errors: Errors = {
  wrongPass: { severity: 'error', message: 'Wrong password!' },
  notFound: { severity: 'warning', message: 'Account not found' },
  notConfirmed: { severity: 'warning', message: "Your registration request wasn't confirmed yet" },
  rejected: { severity: 'error', message: 'Your registration request was rejected' },
};

export function ErrorMsg({ errorType }: ErrorMessage) {
  const alert: ErrorAlert = {
    severity: errors[errorType]?.severity,
    message: errors[errorType]?.message,
  };

  return (
    <div>
      <Alert severity={alert.severity} css={styles.errorMsg}>
        {alert.message}
      </Alert>
    </div>
  );
}
