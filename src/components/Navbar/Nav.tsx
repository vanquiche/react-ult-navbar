import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

// TYPES
import { Props, NavigationNode } from '../types';

// CONTEXTS
import ThemeContext, {
  LightTheme,
  DarkTheme,
} from '../../Contexts/ThemeContext';

// COMPONENTS
import useResponsive from '../../Hooks/useResponsive';
import { MOBILE_QUERY, MOBILE_NAV_HEIGHT } from '../../VALUES';

// STYLESHEET
import styles from './Nav.module.css';
import '../global.css';

const Logo = () => <span>&#128512;</span>;
const CustomLink = ({ name, href }: { name: string; href: string }) => {
  return <a href={href}>{name}</a>;
};
const navigationTree: NavigationNode[] = [
  {
    name: 'Link 1',
    linkElement: <CustomLink name='Link1' href='' />,
  },
  {
    name: 'Link 2',
    dropdown: [
      {
        name: 'Child Link 2a',
        linkElement: <CustomLink name='Child Link 2a' href='' />,
      },
      {
        name: 'Child Link 2a-1',
        dropdown: [
          {
            name: 'Child Link a1',
            linkElement: <CustomLink name='Child Link a1' href='' />,
          },
          {
            name: 'Child Link a2',
            dropdown: [
              {
                name: 'Another One',
                linkElement: <CustomLink name='Child Link a2-1' href='' />,
              },
              {
                name: 'Another Two',
                linkElement: <CustomLink name='Child Link a2-2' href='' />,
              },
            ],
          },
          {
            name: 'Child Link a3',
            linkElement: <CustomLink name='Link Link a3' href='' />,
          },
        ],
      },
    ],
  },
  {
    name: 'Link 3',
    linkElement: <CustomLink name='Link 3' href='' />,
  },
  {
    name: 'Link 4',
    linkElement: <CustomLink name='Link 4' href='' />,
  },
  {
    name: 'Link 5',
    dropdown: [
      {
        name: 'Child Link 1',
        linkElement: <CustomLink name='Child Link 1a' href='' />,
      },
      {
        name: 'Child Link 2',
        linkElement: <CustomLink name='Child Link 2a' href='' />,
      },
      {
        name: 'Child Link 3',
        linkElement: <CustomLink name='Child Link 3a' href='' />,
      },
      {
        name: 'A Very looooooooong link slkjsdfsdf',
        linkElement: <CustomLink name='Child Link 4a' href='' />,
      },
      {
        name: 'Child Link 5',
        linkElement: <CustomLink name='Child Link 5a' href='' />,
      },
    ],
  },
  {
    name: 'Link 6',
    linkElement: <CustomLink name='Link 6' href='' />,
  },
  {
    name: 'Link 7',
    linkElement: <CustomLink name='Link 7' href='' />,
  },
  {
    name: 'Link 8',
    dropdown: [
      {
        name: 'Child Link 1',
        linkElement: <CustomLink name='Child Link 1c' href='' />,
      },
      {
        name: 'Child Link 2',
        linkElement: <CustomLink name='Child Link 2c' href='' />,
      },
      {
        name: 'Child Link 3',
        linkElement: <CustomLink name='Child Link 3c' href='' />,
      },
      {
        name: 'A Very looooooooong',
        linkElement: <CustomLink name='Child Link 4c' href='' />,
      },
      {
        name: 'Child Link 5',
        linkElement: <CustomLink name='Child Link 5c' href='' />,
      },
    ],
  },
];

const Nav = ({ logoName, theme, logoIcon = <Logo />, logoLink }: Props) => {
  const isMobile = useResponsive(MOBILE_QUERY);

  const userTheme = useMemo(
    () => (theme && theme === 'dark' ? DarkTheme : LightTheme),
    [theme]
  );

  // close menu on window size transition
  // useEffect(() => {}, []);

  return (
    <ThemeContext.Provider value={userTheme}>
      <header className={styles.container} style={{ ...userTheme.themes }}>
        <p>Hello World</p>
      </header>
    </ThemeContext.Provider>
  );
};

export default Nav;
