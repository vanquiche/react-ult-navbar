import { useRef } from 'react';
import { Props, NavigationNode } from '../types';
import SubMenu from '../SubMenu.tsx/SubMenu';
import styles from './Nav.module.css';
import '../global.css';

const DefaultLinkEl = ({ name }: { name: string }) => (
  <a
    style={{ display: 'inline', zIndex: 20 }}
    href='#'
    className={styles.navLink}
  >
    {name}
  </a>
);

const Logo = () => <span>L</span>;

const Nav = ({ text, logoName, logoIcon = <Logo /> }: Props) => {
  const navigationTree: NavigationNode[] = [
    {
      name: 'Link 1',
      href: '#',
    },
    {
      name: 'Link 2',
      dropdown: [
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
    {
      name: 'Link 5',
      dropdown: [
        {
          name: 'Child Link 1',
          href: '#',
        },
        {
          name: 'Child Link 2',
          href: '#',
        },
        {
          name: 'Child Link 3',
          href: '#',
        },
        {
          name: 'Child Link 4',
          href: '#',
        },
        {
          name: 'Child Link 5',
          href: '#',
        },
      ],
    },
    {
      name: 'Link 6',
      href: '#',
    },
    {
      name: 'Link 7',
      href: '#',
    },
    {
      name: 'Link 8',
      dropdown: [
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
  ];

  return (
    <>
      <nav className={styles.container}>
        {(logoName || logoIcon) && (
          <div
            style={{
              outline: '1px solid red',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              padding: '0 10px',
            }}
          >
            {logoIcon}
            <span style={{ marginLeft: '1rem' }}>{logoName}</span>
          </div>
        )}
        <ul
          style={{
            display: 'flex',
            gap: '2.5rem',
            outline: '1px solid green',
            padding: '20px',
            zIndex: 10,
            overflowX: 'visible',
          }}
        >
          {navigationTree.map((node, i) => {
            return (
              <li
                key={i}
                style={{
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                {node.linkElement || <DefaultLinkEl name={node.name} />}
                {/* CHILDREN - DROPDOWN */}
                {/* {node.child && (
                  <span style={{ display: 'inline', margin: '0 10px' }}>d</span>
                )} */}
                {node.dropdown && <SubMenu navigation={node.dropdown} />}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
