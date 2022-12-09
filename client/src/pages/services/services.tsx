/** @jsxImportSource @emotion/react */
import React from 'react';
import { Avatar, Box, IconButton, TextField, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { HeaderTitle } from 'components';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import { useCreateAppointmentMutation, useGetAppointmentsQuery } from '../../api/agents';
import styles from './styles';
import { useTypedSelector } from '../../hooks/reduxHooks';

export function Services() {
  const [timeSelectMode, setTimeSelectMode] = React.useState(false);
  const [appointmentId, setAppointmentId] = React.useState('');
  const [date, setDate] = React.useState<Date | null>(null);

  const [createAppointment] = useCreateAppointmentMutation();

  const user = useTypedSelector((state) => state.user);

  const { data: appointments } = useGetAppointmentsQuery({});
  const appointmentsData = appointments?.appointments || [];

  const createAppointmentHandler = () => {
    createAppointment({ id: user.id, date: new Date(date || ''), appointmentId });
    setTimeSelectMode(false);
    setDate(null);
    setAppointmentId('');
  };

  const choiceAppointment = appointmentsData.find((app) => app.id === appointmentId);

  return (
    <Box css={styles.signInPage}>
      <Box css={styles.frame}>
        <HeaderTitle text="SERVICES" />

        {timeSelectMode && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: '6px' }}>
              Your choice: {choiceAppointment?.name}
            </Typography>
            <DesktopDateTimePicker
              label="Choose date and time"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignitems: 'center',
                m: '10px 0',
              }}>
              <IconButton disabled={!date} onClick={createAppointmentHandler}>
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setAppointmentId('');
                  setTimeSelectMode(false);
                  setDate(null);
                }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        )}

        {appointmentsData.map((appointment) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              mb: '15px',
              boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
              borderRadius: '15px',
              padding: '10px',
            }}>
            <Avatar src={appointment.image} sx={{ width: '50px', height: '50px' }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}>
              <Typography variant="h6">{appointment.name}</Typography>
              <Typography variant="subtitle2">{appointment.description}</Typography>
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {appointment.price}$
              </Typography>

              {user.isAuthenticated && (
                <IconButton
                  onClick={() => {
                    setAppointmentId(appointment.id);
                    setTimeSelectMode(true);
                  }}>
                  <AddShoppingCartIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
