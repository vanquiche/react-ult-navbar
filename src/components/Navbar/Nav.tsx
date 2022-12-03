import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

// TYPES
import { Props, NavigationNode } from '../types';

// CONTEXTS
import ThemeContext, {
  LightTheme,
  DarkTheme,
} from '../../Contexts/ThemeContext';

// COMPONENTS
import LinkItem from '../LinkItem/LinkItem';
import SubMenu from '../SubMenu.tsx/SubMenu';
import useResponsive from '../../Hooks/useResponsive';
import HamburgerBtn from '../HamburgerBtn/HamburgerBtn';
import { MOBILE_QUERY, MOBILE_NAV_HEIGHT } from '../../VALUES';

// STYLESHEET
import styles from './Nav.module.css';
import '../global.css';
import LogoWrapper from '../LogoWrapper/LogoWrapper';
import DesktopMenu from '../DesktopMenu/DesktopMenu';

const Logo = () => <span>&#128512;</span>;

const navigationTree: NavigationNode[] = [
  {
    name: 'Link 1',
    href: '#',
  },
  {
    name: 'Link 2',
    dropdown: [
      {
        name: 'Child Link 1a',
        href: '#',
      },
      {
        name: 'Child Link 2b',
        dropdown: [
          {
            name: 'Child Link 1',
            href: '#',
          },
          {
            name: 'Child Link 2',
            dropdown: [
              {
                name: 'Another One',
                href: '#',
              },
              {
                name: 'Another Two',
                href: '#',
              },
            ],
          },
          {
            name: 'Child Link 3',
            href: '#',
          },
        ],
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
        name: 'A Very looooooooong link slkjsdfsdf',
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
      {
        name: 'Child Link 3',
        href: '#',
      },
      {
        name: 'A Very looooooooong',
        href: '#',
      },
      {
        name: 'Child Link 5',
        href: '#',
      },
    ],
  },
];

const closedNavHeight = MOBILE_NAV_HEIGHT;

// TODOS
// 1. Add text wrap for long links
// 2. Enable scrolling when number of nav links
//    exceeds width of navbar

const Nav = ({ logoName, theme, logoIcon = <Logo />, logoLink }: Props) => {
  const isMobile = useResponsive(MOBILE_QUERY);

  const userTheme = useMemo(
    () => (theme && theme === 'dark' ? DarkTheme : LightTheme),
    [theme]
  );

  // close menu on window size transition
  useEffect(() => {}, []);

  return (
    <ThemeContext.Provider value={userTheme}>
      <header className={styles.container} style={{ ...userTheme.themes }}>
        <DesktopMenu navigation={navigationTree} />
      </header>
    </ThemeContext.Provider>
  );
};

export default Nav;
