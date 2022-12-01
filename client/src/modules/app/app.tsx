import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';
import { theme } from 'styles';
import { MainLayout } from 'layouts';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers';

export function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                <MainLayout />
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
