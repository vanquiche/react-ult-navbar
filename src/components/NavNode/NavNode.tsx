import TopLevelMenuContext from '../../Contexts/TopLevelMenuContext';
import Submenu from '../Submenu/Submenu';
import { NavNodeType } from '../types';
import { useState, useRef, useContext, RefObject, CSSProperties } from 'react';

import './NavNode.css';

interface Props {
  node: NavNodeType;
  level: number;
}

const NavNode = ({ node, level }: Props) => {
  const { topLevelMenus, setTopLevelMenus } = useContext(TopLevelMenuContext);
  const [showMenu, setShowMenu] = useState(false);

  const submenuRef = node.submenu ? useRef<HTMLUListElement>(null) : undefined;
  const menuitemRef = useRef<HTMLDivElement>(null);
  const menuId = node.title.replace(' ', '-').toLowerCase();

  const menuIsTopLevel = level === 0;

  const styles: CSSProperties = {
    overflow: level > 1 ? 'hidden' : '',
  };

  async function toggleMenu() {
    // for top-level menu
    if (menuIsTopLevel) {
      setTopLevelMenus((menus) => {
        const updatedMenu = { ...menus };
        for (const prop in updatedMenu) {
          if (prop !== node.title) {
            updatedMenu[prop] = false;
          } else {
            updatedMenu[prop] = !updatedMenu[prop];
          }
        }
        return updatedMenu;
      });
    }
    // not a top-level menu
    else {
      let currentMenuState: boolean | null = null;
      setShowMenu((state) => {
        currentMenuState = state;
        return !state;
      });

      // wait for submenu and menuitems to render in DOM
      const menuItems = new Promise<RefObject<HTMLUListElement>>((res, rej) => {
        setTimeout(() => {
          if (submenuRef) {
            res(submenuRef);
          } else rej(null);
        }, 100);
      });

      const menu = new Promise<RefObject<HTMLDivElement>>((res, rej) => {
        setTimeout(() => {
          if (menuitemRef) {
            res(menuitemRef);
          } else rej(null);
        }, 100);
      });

      Promise.all([menuItems, menu]).then(([listRef, menuRef]) => {
        const height = listRef?.current?.offsetHeight || 0;
        if (menuRef && menuRef.current) {
          const level = menuRef.current.getAttribute('data-menu-level');
          if (level && +level > 0) {
            if (currentMenuState === false) {
              // expand menu to make room for submenu
              menuRef.current.style.paddingBottom = height + 'px';
              // wait for menu to expand before submenu fades in
              setTimeout(() => {
                if (listRef && listRef.current)
                  listRef.current.style.opacity = '1';
              }, 200);
            } else {
              // collapse menu and submenu
              if (listRef && listRef.current)
                listRef.current.style.opacity = '0';
              menuRef.current.style.paddingBottom = '0';
            }
          }
        }
      });
    }
  }

  return (
    <div
      className='menu-item'
      style={styles}
      ref={menuitemRef}
      role='menuitem'
      data-menu-level={level}
      aria-haspopup={node.submenu ? true : false}
    >
      <p
        className={`menu-item__link ${
          menuIsTopLevel ? 'top-level' : 'is-child'
        }`}
      >
        {!node.void ? (
          <node.link {...node.linkAttribute}>{node.title}</node.link>
        ) : (
          <span>{node.title}</span>
        )}
        {node.submenu && (
          <button
            className='menu-item__link-caret'
            onClick={toggleMenu}
            aria-label='dropdown caret'
            aria-controls={menuId}
            aria-expanded={showMenu ? true : false}
          >
            &larr;
          </button>
        )}
      </p>
      {node.submenu &&
        (menuIsTopLevel ? topLevelMenus[node.title] : showMenu) && (
          <Submenu
            id={menuId}
            ref={submenuRef}
            nodes={node.submenu}
            isVisible={menuIsTopLevel ? topLevelMenus[node.title] : showMenu}
            level={level + 1}
          />
        )}
    </div>
  );
};

export default NavNode;
