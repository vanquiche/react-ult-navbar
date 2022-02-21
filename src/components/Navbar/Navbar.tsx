// imported modules
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Navbar.scss';

import { Desktop, Mobile } from './Views';
import HamburgerBtn from './HamburgerBtn';
import SubMenu from './SubMenu';
// Type
import navLink from './NAVLINK';

interface navProps {
  bgColor?: string;
  activeLinkColor?: string;
  fontColor?: string;
  fontSize?: string;
  position?: 'start' | 'center' | 'end';
  fixed?: boolean;
  links?: navLink[];
  logoIcon?: string;
  logoText?: string;
  logoTextClass?: string;
  logoTextSize?: string;
  addClass?: string;
}

const Navbar = (props: navProps) => {
  // state used to expand and collapse menu when in mobile view
  const [expandMenu, setExpandMenu] = useState(false);

  const handleClick = () => {
    setExpandMenu(!expandMenu);
  };
  // animation variant for motion
  const variants = {
    expand: { scaleY: 1 },
    collapse: { scaleY: 0 },
  };

  // render view when screen is desktop width
  const DesktopView = () => {
    return (
      <Desktop>
        {/* logo and icon rendered if provided by user */}
        {props.logoIcon && (
          <Link to='/' style={{ alignSelf: 'center' }}>
            <img className='logo' src={props.logoIcon} alt='brand logo' />
          </Link>
        )}
        {props.logoText && (
          <Link
            to='/'
            className={`logo-text ${props.logoTextClass}`}
            style={{
              color: props.fontColor,
              fontSize: props.logoTextSize || '1.3rem',
            }}
          >
            {props.logoText}
          </Link>
        )}

        {/* maps over provided prop of 'links' */}
        <ul
          className={`desktop-nav desktop-link ${
            props.position === 'start'
              ? 'col-1'
              : props.position === 'center'
              ? 'col-2'
              : 'col-3'
          }`}
          style={{ color: props.fontColor, fontSize: props.fontSize }}
        >
          {props.links?.map((link: navLink, index) => {
            return (
              <>
                <li key={uuidv4()} style={{ position: 'relative' }}>
                  {/* render nav link for each route */}

                  <NavLink
                    key={uuidv4()}
                    to={link.path}
                    style={({ isActive }) =>
                      isActive
                        ? { color: props.activeLinkColor }
                        : { color: props.fontColor }
                    }
                  >
                    {link.text}
                  </NavLink>
                  {/* if children exist, render drop-down menu */}
                  {link.children && (
                    <SubMenu
                      parentPath={link.path}
                      index={index}
                      links={link.children}
                      bgColor={props.bgColor}
                      fontColor={props.fontColor}
                    />
                  )}
                </li>
              </>
            );
          })}
        </ul>
      </Desktop>
    );
  };

  // mobile view component, renders when view is mobile/tablet
  const MobileView = () => {
    return (
      <Mobile>
        {/* menu icon / exit icon */}
        <HamburgerBtn
          color={props.fontColor}
          size={props.fontSize ? props.fontSize : '100px'}
          handleChange={handleClick}
          toggleState={expandMenu}
        />
        {props.logoText && (
          <Link
            to='/'
            className={`logo-text ${props.logoTextClass}`}
            style={{
              color: props.fontColor,
              fontSize: props.logoTextSize || '1.3rem',
              textDecoration: 'none',
            }}
          >
            {props.logoText}
          </Link>
        )}

        <motion.ul
          className='mobile-nav'
          style={{
            color: props.fontColor,
            fontSize: props.fontSize,
            transformOrigin: 'top',
          }}
          variants={variants}
          initial='collapse'
          animate='expand'
        >
          {expandMenu &&
            props.links?.map((link: navLink, index) => {
              return (
                <li key={uuidv4()}>
                  <NavLink
                    key={uuidv4()}
                    to={link.path}
                    style={({ isActive }) =>
                      isActive
                        ? { color: props.activeLinkColor }
                        : { color: props.fontColor }
                    }
                  >
                    {link.text}
                  </NavLink>
                  {link.children && (
                    <SubMenu
                      parentPath={link.path}
                      index={index}
                      links={link.children}
                      view='mobile'
                      fontColor={props.fontColor}
                    />
                  )}
                </li>
              );
            })}
        </motion.ul>
      </Mobile>
    );
  };

  return (
    <header>
      <nav
        className={`navbar navbar-grid ${props.addClass}`}
        style={{
          backgroundColor: props.bgColor,
        }}
      >
        <MobileView />
        <DesktopView />
      </nav>
    </header>
  );
};

export default Navbar;
