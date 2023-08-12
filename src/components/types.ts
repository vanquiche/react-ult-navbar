export interface Props {
  logoName?: string;
  logoIcon?: JSX.Element;
  logoLink?: string;
  theme?: Themes;
}

export interface SubMenuProps {
  navigation: NavigationNode;
}

export interface NavNodeBase {
  name: string;
}

export interface NavigationLink extends NavNodeBase {
  dropdown?: never;
  linkElement: JSX.Element;
}

export interface NavigationDropdown extends NavNodeBase {
  linkElement?: never;
  dropdown: NavigationNode[];
}

export type NavigationNode = NavigationLink | NavigationDropdown;

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
