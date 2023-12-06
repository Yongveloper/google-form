import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import {
  createTheme,
  ThemeProvider as MuiProvider,
} from '@mui/material/styles';
import { GlobalStyles } from '@styles/GlobalStyles.ts';
import { theme } from '@styles/theme.ts';
import { persistor, store } from '@store/store.ts';
import App from './App.tsx';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.purple,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiProvider theme={muiTheme}>
        <StyledProvider theme={theme}>
          <GlobalStyles />
          <App />
        </StyledProvider>
      </MuiProvider>
    </PersistGate>
  </Provider>
);
