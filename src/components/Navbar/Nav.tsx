import { useMemo, useState } from 'react';

// TYPES
import { Props } from '../types';

// CONTEXTS
import ThemeContext, {
  LightTheme,
  DarkTheme,
} from '../../Contexts/ThemeContext';

// STYLESHEET
import styles from './Nav.module.css';
import '../global.css';
import NavNode from '../NavNode/NavNode';
import TopLevelMenuContext from '../../Contexts/TopLevelMenuContext';

const Logo = () => <span>&#128512;</span>;

const Nav = ({
  logoName,
  theme,
  logoIcon = <Logo />,
  logoLink,
  label,
  navigationTree,
}: Props) => {
  const userTheme = useMemo(
    () => (theme && theme === 'dark' ? DarkTheme : LightTheme),
    [theme]
  );

  const topLevelmenus = useMemo(() => {
    const menus: Record<string, boolean> = {};
    for (let i = 0; i < navigationTree.length; i++) {
      if (navigationTree[i].submenu) {
        menus[navigationTree[i].title] = false;
      }
    }
    return menus;
  }, [navigationTree]);

  const [topLevelMenus, setTopLevelMenus] = useState(topLevelmenus);

  return (
    <ThemeContext.Provider value={userTheme}>
      <TopLevelMenuContext.Provider
        value={{
          topLevelMenus,
          setTopLevelMenus,
        }}
      >
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
      </TopLevelMenuContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Nav;
