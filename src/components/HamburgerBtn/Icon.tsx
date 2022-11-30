import React, { CSSProperties } from 'react';
import styles from './Icon.module.css';

const Icon = ({
  state,
  color,
  size,
}: {
  state: boolean;
  color?: string;
  size?: string;
}) => {
  const propContainerStyles: CSSProperties = {
    height: size,
    width: size,
  };

  const propBarStyles: CSSProperties = {
    backgroundColor: color,
  };

  return (
    <div className={styles.container} style={propContainerStyles}>
      <span
        className={`${styles.bar} ${styles.top} ${
          state ? styles.animateTopToClose : styles.animateTopToOpen
        }`}
        style={propBarStyles}
      />
      <span
        className={`${styles.bar} ${styles.bottom} ${
          state ? styles.animateBottomToClose : styles.animateBottomToOpen
        }`}
        style={propBarStyles}
      />
    </div>
  );
};

export default Icon;
