import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import '../Navbar.scss';

interface PropTypes {
  color?: string;
  onClick?: Function;
  reference?: any;
  toggleState?: boolean;
}

const Caret = (props: PropTypes) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 1792 1792'
      className={`btn-click btn-caret ${props.toggleState ? 'flip-caret' : ''}`}
      style={{ marginLeft: '12px' }}
      key={uuidv4()}
      ref={props.reference}
      onClick={handleClick}
    >
      <path
        fill={props.color}
        d='M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z'
      />
    </svg>
  );
};

export default Caret;
