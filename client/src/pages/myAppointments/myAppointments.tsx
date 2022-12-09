/** @jsxImportSource @emotion/react */
import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { HeaderTitle } from 'components';
import styles from './styles';
import { useTypedSelector } from '../../hooks/reduxHooks';
import { useGetMyAppointmentsQuery } from '../../api/agents';

export function MyAppointments() {
  const user = useTypedSelector((state) => state.user);

  const { data: appointments } = useGetMyAppointmentsQuery({ id: user.id });
  const appointmentsData = appointments?.appointments || [];

  return (
    <Box css={styles.signInPage}>
      <Box css={styles.frame}>
        <HeaderTitle text="MY APPOINTMENTS" />

        {appointmentsData.map((appointment) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              mb: '15px',
              boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
              borderRadius: '15px',
              padding: '10px',
            }}>
            <Avatar src={appointment.appointment.image} sx={{ width: '60px' }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Typography variant="h6">{appointment.appointment.name}</Typography>
              <Typography variant="subtitle2">{appointment.appointment.description}</Typography>
            </Box>

            <Typography variant="h6">
              {DateTime.fromJSDate(new Date(appointment.date)).toFormat('dd.MM.yyyy hh:mm')}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {appointment.appointment.price}$
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
