import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

interface Props {
  children: ReactElement[];
}

const globalTheme = {
  card: {
    bgColor: '#003459',
  },
  header: {
    fontSize: '1.2em',
  },
  buttonActive: '#F1FFFA',
  buttonInActive: '#80868a',
};

export type CustomTheme = typeof globalTheme;

function Theme({ children }: Props): ReactElement {
  return <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>;
}

export default Theme;
