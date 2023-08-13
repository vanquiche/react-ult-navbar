import Submenu from '../Submenu/Submenu';
import { NavNodeType } from '../types';
import React, { useState, useRef } from 'react';

const NavNode = ({ node, level }: Props) => {
  const { topLevelMenus, setTopLevelMenus } = useContext(TopLevelMenuContext);
  const [showMenu, setShowMenu] = useState(false);
  const submenuRef = node.submenu ? useRef<HTMLUListElement>(null) : undefined;
  const menuitemRef = useRef<HTMLDivElement>(null);
  const menuId = node.title.replace(' ', '-');

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
    const s = new Promise<React.RefObject<HTMLUListElement>>((res, rej) => {
      setTimeout(() => {
        if (submenuRef) {
          res(submenuRef);
        } else rej(null);
      }, 100);
    });

    const m = new Promise<React.RefObject<HTMLDivElement>>((res, rej) => {
      setTimeout(() => {
        if (menuitemRef) {
          res(menuitemRef);
        } else rej(null);
      }, 100);
    });

    Promise.all([s, m]).then(([sRef, mRef]) => {
      const height = sRef?.current?.offsetHeight;
      if (mRef && mRef.current) {
        const level = mRef.current.getAttribute('data-menu-level');
        if (level && +level > 0) {
          if (menuOpened === false) {
            mRef.current.style.paddingBottom = height + 'px';
          } else {
            mRef.current.style.paddingBottom = '0';
          }
        }
      }
    });
  }

  return (
    <div
      // onMouseLeave={handleMouseLeave}
      // onMouseEnter={handleMouseEnter}
      role='menuitem'
      aria-haspopup={node.submenu ? true : false}
      style={{
        // outline: '1px solid red',
        transition: 'padding-bottom 150ms ease',
        overflow: level > 1 ? 'hidden' : '',
        zIndex: 10,
        position: 'relative',
      }}
      ref={menuitemRef}
      data-menu-level={level}
    >
      <p
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 0',
          position: 'relative',
          zIndex: 100,
        }}
      >
        {!node.void ? (
          <node.link {...node.linkAttribute}>{node.title}</node.link>
        ) : (
          <span>{node.title}</span>
        )}
        {node.submenu && (
          <button
            onClick={toggleMenu}
            aria-label='dropdown caret'
            aria-controls={menuId}
            aria-expanded={showMenu ? true : false}
            style={{ marginLeft: '20px' }}
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
