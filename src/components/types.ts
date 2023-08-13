import React, { FC } from 'react';

export interface Props {
  logoName?: string;
  logoIcon?: JSX.Element;
  logoLink?: string;
  theme?: Themes;
  label?: string;
  navigationTree: NavNodeType[];
}

export interface NavNodeType {
  link: FC<{ children: React.ReactNode }>;
  submenu?: NavNodeType[];
  void?: boolean;
  title: string;
  linkAttribute: object;
}

export interface ThemeType {
  themes: {
    backgroundColor: string;
    color: string;
  };
}

export interface ThemeContextType {
  theme: ThemeType;
}

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}
