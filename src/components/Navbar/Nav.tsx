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
    ],
  },
];

const closedNavHeight = MOBILE_NAV_HEIGHT;

const Nav = ({ logoName, theme, logoIcon = <Logo />, logoLink }: Props) => {
  const [expandMenu, setExpandMenu] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const isMobile = useResponsive(MOBILE_QUERY);

  const userTheme = useMemo(
    () => (theme && theme === 'dark' ? DarkTheme : LightTheme),
    [theme]
  );

  const navAnimationStyles: CSSProperties = isMobile
    ? {
        height: expandMenu ? '100%' : `${closedNavHeight}px`,
        overflow: 'hidden',
      }
    : { alignItems: 'center' };

  function toggleMobileMenu() {
    setExpandMenu((prev) => !prev);
  }

  // close menu on window size transition
  useEffect(() => {
    return () => setExpandMenu(false);
  }, [isMobile]);

  return (
    <ThemeContext.Provider value={userTheme}>
      <nav
        className={`${styles.container} ${
          isMobile ? styles.flexCol : styles.flexRow
        }`}
        style={{ ...userTheme.themes, ...navAnimationStyles }}
        ref={navRef}
      >
        {isMobile && (
          <HamburgerBtn onClick={toggleMobileMenu} open={expandMenu} />
        )}

        {/* NAVIGATION */}
        <ul
          className={`${styles.navWrapper} ${
            isMobile ? styles.flexCol : styles.flexRow
          }`}
        >
          {(logoName || logoIcon) && (
            <LogoWrapper title={logoName} href={logoLink}>
              {logoIcon}
            </LogoWrapper>
          )}

          {navigationTree.map((node, i) => {
            return (
              <li
                key={i}
                className={styles.navItem}
                style={{
                  ...userTheme.themes,
                }}
              >
                {node.linkElement ? (
                  node.linkElement
                ) : node.href ? (
                  <LinkItem name={node.name} href={node.href} />
                ) : node.dropdown ? (
                  <SubMenu navigation={node.dropdown} name={node.name} />
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </ThemeContext.Provider>
  );
};

export default Nav;
