import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import '../HamburgerBtn.scss';

interface propTypes {
  size: string;
  color?: string; // color
  handleChange?: Function;
  toggleState?: boolean; // toggleState
}

const HamburgerBtn = (props: propTypes) => {
  // TODOs
  // add two variants for animation
  // one for false state and true state
  // read article on parent prop state change principles
  // remove keys

  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = () => {
    if (props.handleChange) {
      props.handleChange();
    }
  };
  useEffect(() => {
    if (props.toggleState) setOpenMenu(props.toggleState);
  }, [props.toggleState]);

  return (
    <div
      key={uuidv4()}
      className='menu'
      style={{ height: props.size || '1.1rem', width: props.size || '1.1rem'}}
      onClick={handleClick}
    >
      {/* top menu bar */}
      <motion.div
        key={uuidv4()}
        className='menu-bar top-bar'
        style={{
          backgroundColor: props.color,
          top: openMenu ? '42.5%' : '10%',
        }}
        initial={openMenu ? { rotate: 0 } : { rotate: 45 }}
        animate={openMenu ? { rotate: 45 } : { rotate: 0 }}
      />
      {/* center menu bar */}
      <motion.div
        key={uuidv4()}
        className='menu-bar center-bar'
        style={{ backgroundColor: props.color }}
        initial={openMenu ? { width: '100%' } : { width: 0 }}
        animate={
          openMenu
            ? { width: 0, transition: { delay: 0.04 } }
            : { width: '100%' }
        }
      />
      {/* bottom menu bar */}
      <motion.div
        key={uuidv4()}
        className='menu-bar bottom-bar'
        style={{
          backgroundColor: props.color,
          bottom: openMenu ? '42.5%' : '10%',
        }}
        initial={openMenu ? { rotate: 0 } : { rotate: -45 }}
        animate={openMenu ? { rotate: -45 } : { rotate: 0 }}
      />
    </div>
  );
};

export default HamburgerBtn;
