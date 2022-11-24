export interface Props {
  text?: string;
}

export interface SubMenuProps {
  navigation: NavigationNode;
}

export interface NavNodeBase {
  icon?: JSX.Element;
  child?: NavigationNode[] | null;
}

export interface NavigationLink extends NavNodeBase {
  name: string;
  href: string;
  linkElement?: never;
}

export interface NavigationWrapper extends NavNodeBase {
  name?: never;
  href?: never;
  linkElement: JSX.Element;
}

export type NavigationNode = NavigationLink | NavigationWrapper;
