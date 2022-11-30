import { CSSProperties } from 'react';
import styles from './LogoWrapper.module.css';

const LogoWrapper = ({
  title,
  children,
  style,
  href,
}: {
  title?: string;
  children?: JSX.Element;
  style?: CSSProperties;
  href?: string;
}) => {
  return (
    <li className={styles.container} style={style}>
      {children}
      {href ? (
        <a className={styles.title} href={href}>
          {title}
        </a>
      ) : (
        <span className={styles.title}>{title}</span>
      )}
    </li>
  );
};

export default LogoWrapper;
