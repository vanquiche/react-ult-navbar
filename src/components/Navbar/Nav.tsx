import styles from './Nav.module.css';
import { Props, NavigationNode } from '../types';
import { CSSProperties, useMemo, useRef, useState } from 'react';
import SubMenu from '../SubMenu.tsx/SubMenu';

const CustomLinkEl = ({ name }: { name: string }) => (
  <p style={{ color: 'tomato' }}>{name}</p>
);

const DefaultLinkEl = ({ name }: { name: string }) => <p>{name}</p>;

const Nav = ({ text }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigationTree: NavigationNode[] = [
    {
      name: 'Link 1',
      href: '#',
    },
    {
      name: 'Link 2',
      href: '#',

      child: [
        {
          name: 'Child Link 1',
          href: '#',
        },
        {
          name: 'Child Link 2',
          href: '#',
        },
      ],
    },
    {
      name: 'Link 3',
      href: '#',
    },
    {
      name: 'Link 4',
      href: '#',
    },
  ];

  const dropdownMenuStyle: CSSProperties = {
    display: showMenu ? 'block' : 'none',
  };

  return (
    <nav className={styles.container}>
      <ul style={{ display: 'flex' }}>
        {navigationTree.map((node, i) => {
          return node.name ? (
            <li
              key={i}
              style={{
                position: 'relative',
                outline: '1px solid red',
                display: 'inline-block',
              }}
            >
              <DefaultLinkEl name={node.name} />

              {/* CHILDREN - DROPDOWN */}
              {node.child && <SubMenu navigation={node.child} />}
            </li>
          ) : (
            <li key={i}>
              {node.linkElement}
              {node.child && (
                <ul>
                  {node.child.map((childNode, j) => {
                    return childNode.name ? (
                      <li key={i + j}>
                        <DefaultLinkEl name={childNode.name} />
                      </li>
                    ) : (
                      <li key={i + j}>{childNode.linkElement}</li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
