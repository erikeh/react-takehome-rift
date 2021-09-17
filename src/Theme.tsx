import React, { ReactElement } from 'react';
import { ThemedCssFunction, ThemeProvider } from 'styled-components';

interface Props {
  children: ReactElement[];
}

const globalTheme = {
  bgColor: '#FF000',
  header: {
    fontSize: '2em',
  },
  buttonActive: '#80868a',
  buttonInActive: '#F1FFFA',
};

export type CustomTheme = typeof globalTheme;

function Theme({ children }: Props): ReactElement {
  return <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>;
}

export default Theme;
