import React, { CSSProperties, useState } from 'react';
import { NavigationNode } from '../types';

const SubMenu = ({ navigation }: { navigation: NavigationNode[] }) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuDisplayStyle: CSSProperties = {
    display: showMenu ? 'block' : 'none',
    position: 'absolute',
    top: '100%',
    whiteSpace: 'nowrap',
    outline: '1px solid green',
    padding: '20px 10px',
    zIndex: 20,
    backgroundColor: 'lightblue',
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        outline: '1px solid blue',
        // display: 'block',
        width: '100%',
        height: '100%',
        // zIndex: -1,
      }}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <span
        style={{
          position: 'absolute',
          top: '100%',
          width: '25px',
          right: '-25px',
          transform: 'translateY(-100%)',
          textAlign: 'center',
        }}
      >
        d
      </span>

      {
        <ul style={menuDisplayStyle}>
          {navigation.map((node, i) => {
            return node.name ? (
              <li key={i}>{node.name}</li>
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
