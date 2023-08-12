import Submenu from '../Submenu/Submenu';
import { NavNodeType } from '../types';
import React, { useState, useRef } from 'react';

const NavNode = ({ node, level }: { node: NavNodeType; level: number }) => {
  const [showMenu, setShowMenu] = useState(false);
  const submenuRef = node.submenu ? useRef<HTMLUListElement>(null) : undefined;
  const menuitemRef = useRef<HTMLDivElement>(null);
  const menuId = node.title.replace(' ', '-');
  // function handleMouseEnter() {
  //   setShowMenu(true);
  // }

  // function handleMouseLeave() {
  //   setShowMenu(false);
  // }
  async function toggleMenu() {
    const h = new Promise((res) => {
      setTimeout(() => {
        res(submenuRef?.current?.offsetHeight);
      }, 100);
    });
    setShowMenu((state) => !state);
    if (submenuRef && submenuRef.current) {
      if (menuitemRef && menuitemRef.current) {
        // menuitemRef.current.style.paddingBottom = '100px';
        // console.log(await h);
        const level = menuitemRef.current.getAttribute('data-menu-level');
        if (level && +level > 0) {
          menuitemRef.current.style.paddingBottom = (await h) + 'px';
        }
      }
    }
  }

  return (
    <div
      // onMouseLeave={handleMouseLeave}
      // onMouseEnter={handleMouseEnter}
      role='menuitem'
      aria-haspopup={node.submenu ? true : false}
      style={{
        outline: '1px solid red',
        transition: 'padding-bottom 250ms ease',
      }}
      ref={menuitemRef}
      data-menu-level={level}
    >
      <p
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '8px 0',
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
          >
            &larr;
          </button>
        )}
      </p>
      {node.submenu && (
        <Submenu
          id={menuId}
          nodes={node.submenu}
          isVisible={showMenu}
          ref={submenuRef}
          level={level + 1}
        />
      )}
    </div>
  );
};

export default NavNode;
