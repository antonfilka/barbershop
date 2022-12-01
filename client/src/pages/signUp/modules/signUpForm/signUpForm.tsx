/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { PasswordInput, TextFieldControlled } from 'components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidationSchema } from 'validators';
import { useSignUpMutation } from 'api/agents';
import { APP_ROUTES } from 'constants/';
import { useNavigate } from 'react-router-dom';
import { theme } from 'styles';
import styles from './styles';

interface SignUpFormError {
  status?: any;
  data?: any;
}

interface UseSignUpForm {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export function SignUpForm() {
  interface ShowPasswordsState {
    showPassword: boolean;
    showPasswordConfirm: boolean;
  }

  const [showPasswords, setShowPasswords] = React.useState<ShowPasswordsState>({
    showPassword: false,
    showPasswordConfirm: false,
  });

  const [emailError, setEmailError] = React.useState<string>('');

  const navigate = useNavigate();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<UseSignUpForm>({
    mode: 'onSubmit',
    resolver: yupResolver(signUpValidationSchema),
  });

  const [createUser, data] = useSignUpMutation();

  const onSubmit: SubmitHandler<UseSignUpForm> = (formData) => {
    const mutationData = { ...formData };
    delete mutationData.passwordConfirm;
    createUser(mutationData);
  };

  useEffect(() => {
    const errorData: SignUpFormError = {};
    Object.assign(errorData, data.error);

    if (data.status === 'fulfilled') {
      setEmailError('');
      reset({ name: '', surname: '', email: '', password: '', passwordConfirm: '' });
    } else if (errorData.status === 409) {
      setEmailError(errorData.data.msg);
    }
  }, [data]);

  const handleClickShowPassword = () => {
    setShowPasswords({
      ...showPasswords,
      showPassword: !showPasswords.showPassword,
    });
  };

  const handleClickShowPasswordConfirm = () => {
    setShowPasswords({
      ...showPasswords,
      showPasswordConfirm: !showPasswords.showPasswordConfirm,
    });
  };

  const handleBackButtonClick = () => {
    navigate(APP_ROUTES.SIGN_IN);
  };

  return (
    <form css={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div css={styles.row}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextFieldControlled
              label="First name *"
              variant="standard"
              autoComplete="off"
              field={field}
              fullWidth
              error={!!errors.name?.message}
              helperText={errors?.name?.message}
              sx={{
                marginRight: '20px',
                [theme.breakpoints.down(theme.breakpoints.values.md)]: {
                  marginBottom: '30px',
                },
              }}
              inputProps={{ maxLength: 11 }}
            />
          )}
        />
        <Controller
          name="surname"
          control={control}
          render={({ field }) => (
            <TextFieldControlled
              label="Last name *"
              variant="standard"
              autoComplete="off"
              field={field}
              fullWidth
              error={!!errors.surname?.message}
              helperText={errors?.surname?.message}
              inputProps={{ maxLength: 15 }}
            />
          )}
        />
      </div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextFieldControlled
            label="Email address *"
            variant="standard"
            autoComplete="off"
            field={field}
            fullWidth
            error={!!errors.email?.message || !!emailError}
            helperText={errors?.email?.message || emailError}
            sx={{ marginBottom: '30px' }}
          />
        )}
      />
      <div css={styles.row}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Box
              sx={{
                [theme.breakpoints.down(theme.breakpoints.values.md)]: {
                  marginRight: '0px',
                  marginBottom: '20px',
                },
                marginRight: '18px',
              }}>
              <PasswordInput
                errorMsg={errors.password?.message}
                field={field}
                clickHandler={handleClickShowPassword}
                showPassword={showPasswords.showPassword}
                twoParts
              />
            </Box>
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <PasswordInput
              errorMsg={errors.passwordConfirm?.message}
              field={field}
              clickHandler={handleClickShowPasswordConfirm}
              showPassword={showPasswords.showPasswordConfirm}
              twoParts
            />
          )}
        />
      </div>
      <div css={styles.buttons}>
        <Button
          variant="contained"
          sx={{
            [theme.breakpoints.down(theme.breakpoints.values.md)]: {
              marginBottom: '15px',
            },
          }}
          color="inherit"
          onClick={handleBackButtonClick}>
          BACK
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!(Object.keys(dirtyFields).length === 5)}>
          SIGN UP
        </Button>
      </div>
    </form>
  );
}
