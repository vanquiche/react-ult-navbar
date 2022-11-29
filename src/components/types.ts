import { CSSProperties } from 'react';

export interface Props {
  logoName?: string;
  logoIcon?: JSX.Element;
  theme?: Themes;
}

export interface SubMenuProps {
  navigation: NavigationNode;
}

export interface NavNodeBase {
  icon?: JSX.Element;
  name: string;
}

export interface NavigationLink extends NavNodeBase {
  href: string;
  dropdown?: never;
  linkElement?: never;
}

export interface NavigationWrapper extends NavNodeBase {
  href?: never;
  dropdown?: never;
  linkElement: JSX.Element;
}

export interface NavigationDropdown extends NavNodeBase {
  href?: never;
  linkElement?: never;
  dropdown: NavigationNode[];
}

export type NavigationNode =
  | NavigationLink
  | NavigationWrapper
  | NavigationDropdown;

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
