import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import NAVLINK from '../Types';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface PropTypes {
  links: NAVLINK[];
  index: number;
  parentPath: string;
  view?: 'mobile' | 'desktop';
  bgColor?: string;
  fontColor?: string;
}

const SubMenu = (props: PropTypes) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [focusMenu, setFocusMenu] = useState(false);
  const closeMenu = () => {
    if (focusMenu === false) setOpenMenu(false);
  };
  const variants = {
    hidden: { scaleY: 0 },
    visibile: { scaleY: 1 },
    exit: { scale: 0 },
  };
  return (
    <>
      <FontAwesomeIcon
        icon={faCaretDown}
        className={`btn-click btn-caret ${openMenu ? 'flip-caret' : ''}`}
        style={{ marginLeft: '12px' }}
        tabIndex={props.index}
        onClick={() => setOpenMenu(!openMenu)}
        onBlur={closeMenu}
      />

      <AnimatePresence>
        {openMenu && (
          <motion.div
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
              onMouseEnter={() => setFocusMenu(true)}
              onMouseLeave={() => setFocusMenu(false)}
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
