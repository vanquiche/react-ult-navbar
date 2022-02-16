import { useMediaQuery } from 'react-responsive';

type PropTypes = {
  children?: any;
};

const Desktop = ({ children }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  return isDesktop ? children : null;
};

const Mobile = (props: PropTypes ) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? props.children : null;
};
export { Desktop, Mobile };
