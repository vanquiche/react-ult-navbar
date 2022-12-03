import { createContext } from 'react';
import { ThemeType } from '../components/types';

export const DarkTheme: ThemeType = {
  themes: { backgroundColor: '#343a40', color: 'lightgrey' },
};

export const LightTheme: ThemeType = {
  themes: { backgroundColor: '#fffcf2', color: 'black' },
};

const defaultTheme = {
  themes: {
    backgroundColor: '',
    color: '',
  },
};

const ThemeContext =
  createContext<{ themes: { backgroundColor: string; color: string } }>(
    defaultTheme
  );

export default ThemeContext;
