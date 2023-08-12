import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

// TYPES
import { Props, NavNodeType } from '../types';

// CONTEXTS
import ThemeContext, {
  LightTheme,
  DarkTheme,
} from '../../Contexts/ThemeContext';

// STYLESHEET
import styles from './Nav.module.css';
import '../global.css';
import NavNode from '../NavNode/NavNode';
import Submenu from '../Submenu/Submenu';

const Logo = () => <span>&#128512;</span>;

const navigationTree: NavNodeType[] = [
  {
    link: (props) => <a {...props}>{props.children}</a>,
    title: 'Hello World',
    linkAttribute: { href: 'http://google.com', target: '_blank' },
  },
  {
    link: (props) => <a {...props}>{props.children}</a>,
    title: 'Second Link',
    linkAttribute: {},
    void: true,
    submenu: [
      {
        link: (props) => <a {...props}>{props.children}</a>,
        title: 'Sub menu link 1',
        linkAttribute: { href: 'http://google.com', target: '_blank' },
      },
      {
        link: (props) => <a {...props}>{props.children}</a>,
        title: 'Sub menu link 3',
        linkAttribute: { href: 'http://google.com', target: '_blank' },
        submenu: [
          {
            link: (props) => <a {...props}>{props.children}</a>,
            title: 'Sub menu link 1',
            linkAttribute: { href: 'http://google.com', target: '_blank' },
          },
          {
            link: (props) => <a {...props}>{props.children}</a>,
            title: 'Sub menu link 2',
            linkAttribute: { href: 'http://google.com', target: '_blank' },
          },
          {
            link: (props) => <a {...props}>{props.children}</a>,
            title: 'Sub menu link 3',
            linkAttribute: { href: 'http://google.com', target: '_blank' },
          },
        ],
      },
      {
        link: (props) => <a {...props}>{props.children}</a>,
        title: 'Sub menu link 2',
        linkAttribute: { href: 'http://google.com', target: '_blank' },
      },
    ],
  },
];

const Nav = ({
  logoName,
  theme,
  logoIcon = <Logo />,
  logoLink,
  label,
}: Props) => {
  const userTheme = useMemo(
    () => (theme && theme === 'dark' ? DarkTheme : LightTheme),
    [theme]
  );

  return (
    <ThemeContext.Provider value={userTheme}>
      <header className={styles.container} style={{ ...userTheme.themes }}>
        <nav aria-label={label || 'main-navigation'}>
          {/* when able to check screen dimension change aria attributes */}
          <ul
            role='menubar'
            aria-haspopup={false}
            aria-expanded={false}
            style={{ display: 'flex', columnGap: '16px' }}
          >
            {navigationTree.map((node, i) => {
              return (
                <li key={i}>
                  <NavNode node={node} level={0} />
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </ThemeContext.Provider>
  );
};

export default Nav;
