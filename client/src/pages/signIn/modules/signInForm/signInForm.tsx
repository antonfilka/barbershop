/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidationSchema } from 'validators';
import { PasswordInput, TextFieldControlled } from 'components';
import { useSignInMutation } from 'api/agents';
import { APP_ROUTES } from 'constants/';
import { useTypedDispatch } from 'hooks/reduxHooks';
import { setAuthenticated } from 'store/reducers';
import styles from './styles';

interface UseSignInForm {
  email: string;
  password: string;
}

interface SignInFormPropsError {
  wrongPass: boolean;
  notFound: boolean;
  notConfirmed: boolean;
  rejected: boolean;
}

interface SignInFormProps {
  setErrorMessage: (errorMessage: SignInFormPropsError) => void;
}

export function SignInForm({ setErrorMessage }: SignInFormProps) {
  const [showPassword, setShowPasswords] = useState(false);
  const [loginUser, response] = useSignInMutation();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response.status === 'fulfilled') {
      navigate(APP_ROUTES.MAIN);
      dispatch(setAuthenticated(true));
    }
  }, [response]);

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<UseSignInForm>({
    mode: 'onSubmit',
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit: SubmitHandler<UseSignInForm> = (submitData) => {
    const timeZone = -new Date().getTimezoneOffset() / 60;
    loginUser({ ...submitData, timeZone })
      .unwrap()
      .catch((error) => {
        if (error?.status === 405) {
          setErrorMessage({
            wrongPass: false,
            notFound: false,
            notConfirmed: false,
            rejected: true,
          });
        }
        if (error?.status === 404) {
          setErrorMessage({
            wrongPass: false,
            notFound: true,
            notConfirmed: false,
            rejected: false,
          });
        }
        if (error?.status === 403) {
          setErrorMessage({
            wrongPass: false,
            notFound: false,
            notConfirmed: true,
            rejected: false,
          });
        }
        if (error?.status === 401) {
          setErrorMessage({
            wrongPass: true,
            notFound: false,
            notConfirmed: false,
            rejected: false,
          });
        }
      });
  };

  const handleClickShowPassword = () => {
    setShowPasswords(!showPassword);
  };

  return (
    <form css={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextFieldControlled
            label="Email address *"
            variant="standard"
            autoComplete="off"
            fullWidth
            field={field}
            error={!!errors.email?.message}
            helperText={errors?.email?.message}
            sx={{ mb: '20px' }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            errorMsg={errors.password?.message}
            field={field}
            clickHandler={handleClickShowPassword}
            showPassword={showPassword}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: '30px' }}
        disabled={!(Object.keys(dirtyFields).length === 2)}>
        SUBMIT
      </Button>
    </form>
  );
}
