import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import navLink from './NAVLINK';
import { motion, AnimatePresence } from 'framer-motion';
import Caret from './Caret';

interface PropTypes {
  links: navLink[];
  index: number;
  parentPath: string;
  view?: 'mobile' | 'desktop';
  bgColor?: string;
  fontColor?: string;
}

const SubMenu = (props: PropTypes) => {
  const [openMenu, setOpenMenu] = useState(false);

  const subMenuRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<SVGElement>(null);

  const handleClick = () => {
    // toggles submenu visibility
    setOpenMenu(!openMenu);
  };
  // animation settings for subMenu
  const variants = {
    hidden: { scaleY: 0 },
    visibile: { scaleY: 1 },
    exit: { scale: 0 },
  };

  useEffect(() => {
    const eventHandler = (e: Event) => {
      // if menu is not open do nothing
      if (!openMenu) return;
      const caret = caretRef.current;
      const menu = subMenuRef.current;

      // if caret or menu is clicked also do nothing
      if (caret && caret.contains(e.target as Element)) {
        return;
      }
      if (menu && menu.contains(e.target as Element)) {
        return;
      }

      // if menu is open and node is not clicked then close menu
      setOpenMenu(false);
    };

    // add event listeners here
    // if menu is open, document will listen for any clicks outside of caret and submenu
    // if clicks exist outside of both element then openMenu is set to true
    // removing submenu from DOM
    if (openMenu) {
      document.addEventListener('click', eventHandler);
    } else {
      document.removeEventListener('click', eventHandler);
    }

    return () => {
      document.removeEventListener('click', eventHandler);
    };
  }, [openMenu]);

  return (
    <>
      <Caret
        onClick={handleClick}
        color={props.fontColor}
        reference={caretRef}
        toggleState={openMenu}
      />
      <AnimatePresence>
        {openMenu && (
          <motion.div
            ref={subMenuRef}
            key='dropdown'
            variants={variants}
            initial='hidden'
            animate='visibile'
            exit={props.view === 'mobile' ? 'hidden' : 'exit'}
            style={{ transformOrigin: props.view === 'mobile' ? 'top' : '' }}
          >
            <ul
              className={
                props.view === 'mobile' ? 'dropdown-mobile' : 'dropdown-desktop'
              }
              style={{
                backgroundColor:
                  props.view === 'mobile' ? 'inherit' : props.fontColor,
              }}
            >
              {props.links.map((link, index) => (
                <li
                  tabIndex={index}
                  key={uuidv4()}
                  className={
                    props.view === 'mobile'
                      ? 'dropdown-link-mobile'
                      : 'dropdown-link'
                  }
                >
                  <Link
                    key={uuidv4()}
                    to={`${props.parentPath}/${link.path}`}
                    style={{
                      color:
                        props.view === 'mobile'
                          ? props.fontColor
                          : props.bgColor,
                    }}
                    onClick={() => setOpenMenu(false)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default SubMenu;
