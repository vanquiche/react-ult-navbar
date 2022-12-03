import React, { Fragment, useState } from 'react';
import { NavigationDropdown, NavigationNode } from '../types';

const Dropdown = ({ navigation }: { navigation: NavigationNode[] }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <ul style={{ marginLeft: '15px' }}>
      {navigation.map((node) => {
        return (
          <Fragment key={Math.random()}>
            <li
              style={node.dropdown ? { color: 'red' } : undefined}
              onClick={() => setOpenMenu((prev) => !prev)}
            >
              {node.name}
            </li>
            {node.dropdown
              ? openMenu && <Dropdown navigation={node.dropdown} />
              : null}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default Dropdown;
