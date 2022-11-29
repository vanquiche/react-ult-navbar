import { Props, NavigationNode } from '../types';
import { useMemo } from 'react';
import SubMenu from '../SubMenu.tsx/SubMenu';
import styles from './Nav.module.css';
import '../global.css';
import LinkItem from '../LinkItem/LinkItem';
import ThemeContext, {
  LightTheme,
  DarkTheme,
} from '../../Contexts/ThemeContext';
import useResponsive from '../../Hooks/useResponsive';

const Logo = () => <span>&#128512;</span>;

const Nav = ({ logoName, theme, logoIcon = <Logo /> }: Props) => {
  const isMobile = useResponsive(840);
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

  const selectedTheme = useMemo(
    () => (theme && theme === 'dark' ? DarkTheme : LightTheme),
    [theme]
  );

  return (
    <ThemeContext.Provider value={selectedTheme}>
      <nav className={styles.container} style={selectedTheme.themes}>
        <p>{isMobile ? 'mobile' : 'desktop'}</p>
        {(logoName || logoIcon) && (
          <div className={styles.logo}>
            {logoIcon}
            <span className={styles.logoTitle}>{logoName}</span>
          </div>
        )}
        <ul className={styles.navWrapper}>
          {navigationTree.map((node, i) => {
            return (
              <li
                key={i}
                className={styles.navItem}
                style={selectedTheme.themes}
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
