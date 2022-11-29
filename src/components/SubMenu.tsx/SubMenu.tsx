import React, { CSSProperties, useContext, useState } from 'react';
import ThemeContext from '../../Contexts/ThemeContext';
import LinkItem from '../LinkItem/LinkItem';
import { NavigationNode } from '../types';
import styles from './SubMenu.module.css';

const SubMenu = ({
  navigation,
  name,
}: {
  navigation: NavigationNode[];
  name: string;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { themes } = useContext(ThemeContext);

  const menuDisplayStyle: CSSProperties = {
    display: showMenu ? 'block' : 'none',
    ...themes,
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <span className={styles.title}>{name} &#9660;</span>

      {
        <ul style={menuDisplayStyle} className={styles.dropdown}>
          {navigation.map((node, i) => {
            return node.href ? (
              <li key={i}>
                <LinkItem name={node.name} href={node.href} />
              </li>
            ) : (
              <li key={i}>{node.linkElement}</li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default React.memo(SubMenu);
