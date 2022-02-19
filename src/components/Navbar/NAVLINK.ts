type NAVLINK = {
  path: string;
  text: string;
  icon?: string;
  component: JSX.Element;
  children?: NAVLINK[];
};

export default NAVLINK;