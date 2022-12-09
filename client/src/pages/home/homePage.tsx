import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../../api/agents';
import { APP_ROUTES } from '../../constants';
import { useTypedSelector, useTypedDispatch } from '../../hooks/reduxHooks';
import { setAuthenticated } from '../../store/reducers';

export function HomePage() {
  const user = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  const [logout] = useLogoutMutation();

  const logoutHandler = () => {
    logout(user.id);
    dispatch(setAuthenticated(false));
  };

  return (
    <Box
      sx={{
        height: ' 100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          height: '100%',
          width: '40%',
          backgroundColor: '#3D0C11',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '50px',
        }}>
        <Typography variant="h2" sx={{ fontWeight: 600, color: 'white', mt: '30px' }}>
          Barbershop
        </Typography>
        {user.isAuthenticated && (
          <Typography variant="h3" sx={{ fontWeight: 500, color: 'white', mt: '30px' }}>
            Hi, {user.name}
          </Typography>
        )}
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: '10px' }}>
          <Link to={APP_ROUTES.SERVICES}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: 'white',
                mt: '50px',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.1)' },
              }}>
              - Services
            </Typography>
          </Link>

          {!user.isAuthenticated && (
            <Link to={APP_ROUTES.SIGN_IN}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: 'white',
                  mt: '50px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { transform: 'scale(1.1)' },
                }}>
                - Sign in
              </Typography>
            </Link>
          )}
          {user.isAuthenticated && (
            <Link to={APP_ROUTES.MY_APPOINTMENTS}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: 'white',
                  mt: '40px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { transform: 'scale(1.1)' },
                }}>
                - My Appointments
              </Typography>
            </Link>
          )}
          {/* {user.isAuthenticated && (
            <Link to="/services">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: 'white',
                  mt: '40px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { transform: 'scale(1.1)' },
                }}>
                - Referal programm
              </Typography>
            </Link>
          )} */}
        </Box>
        {user.isAuthenticated && (
          <Typography
            onClick={logoutHandler}
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'white',
              mt: '235px',
              '&:hover': {
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.1)' },
              },
            }}>
            Log out
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          height: '100%',
          width: '60%',
          backgroundImage: 'url(https://fidelbarbershop.ru/files/otkrytie.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </Box>
  );
}
