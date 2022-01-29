import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

interface NavbarProps {
  position: 'top' | 'left' | 'right',
  fixed: boolean,
  bgColor: string,
  fontSize: string,
  fontUnit: 'px' | 'rem' | 'em',
  fontColor: string,
}

const Navbar = (props: NavbarProps) => {
  return <nav>Test</nav>;
};

export default Navbar;
