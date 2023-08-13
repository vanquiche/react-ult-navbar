import TopLevelMenuContext from '../../Contexts/TopLevelMenuContext';
import Submenu from '../Submenu/Submenu';
import { NavNodeType } from '../types';
import { useState, useRef, useContext, RefObject, CSSProperties } from 'react';
import { ActionTypes } from '../../Reducers/topLevelMenuReducers';

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

  function openSubmenu() {
    let currentMenuState: boolean | null = null;
    setShowMenu((state) => {
      // get current menu state to know if menu is currently opened
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
    // wait for both promises to complete concurrently
    Promise.all([menuItems, menu]).then(([listRef, menuRef]) => {
      // get height of submenu so we know how much margin to apply at bottom
      const menuHeight = listRef?.current?.offsetHeight || 0;

      if (menuRef && menuRef.current) {
        const menuLevel = menuRef.current.getAttribute('data-menu-level');
        // only expand menu in dropdown, not top-level menu
        if (menuLevel && +menuLevel > 0) {
          if (currentMenuState === false) {
            // menu is closed and will be opening
            // expand menu to make room for submenu
            menuRef.current.style.paddingBottom = menuHeight + 'px';
            // wait for menu to expand before submenu fades in
            // purely for aesthetic purposes
            setTimeout(() => {
              if (listRef && listRef.current)
                listRef.current.style.opacity = '1';
            }, 200);
          } else {
            // menu is opened and will be closing
            // collapse menu and submenu
            if (listRef && listRef.current) listRef.current.style.opacity = '0';
            menuRef.current.style.paddingBottom = '0';
          }
        }
      }
    });
  }

  function toggleMenu() {
    if (menuIsTopLevel) {
      // for top-level menu
      setTopLevelMenus({ type: ActionTypes.OPEN, payload: node.title });
    } else {
      // not a top-level menu
      openSubmenu();
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
