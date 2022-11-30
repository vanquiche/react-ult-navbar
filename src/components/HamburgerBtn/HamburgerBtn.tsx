import { useContext } from 'react';
import ThemeContext from '../../Contexts/ThemeContext';
import { MOBILE_NAV_HEIGHT } from '../../VALUES';
import styles from './HamburgerBtn.module.css';
import Icon from './Icon';
const HamburgerBtn = ({
  open,
  className,
  onClick,
}: {
  open: boolean;
  className?: string;
  onClick: () => void;
}) => {
  const { themes } = useContext(ThemeContext);
  const verticalPositionStyles = {
    top: `${MOBILE_NAV_HEIGHT * 0.5}px`,
  };

  return (
    <button
      onClick={onClick}
      style={verticalPositionStyles}
      className={`${styles.container} ${className}`}
    >
      <Icon state={open} color={themes.color} />
    </button>
  );
};

export default HamburgerBtn;
