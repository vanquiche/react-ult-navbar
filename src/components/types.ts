export interface Props {
  text?: string;
  logoName?: string;
  logoIcon?: JSX.Element;
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
