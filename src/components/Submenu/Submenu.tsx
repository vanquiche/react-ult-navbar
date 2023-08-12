import { CSSProperties, ForwardedRef } from 'react';
import NavNode from '../NavNode/NavNode';
import { NavNodeType } from '../types';
import { forwardRef } from 'react';

import './Submenu.css';

const Submenu = forwardRef(
  (
    {
      nodes,
      isVisible,
      level,
      id,
    }: {
      nodes: NavNodeType[];
      isVisible: boolean;
      level: number;
      id: string;
    },
    ref: ForwardedRef<HTMLUListElement>
  ) => {
    const styles: CSSProperties = {
      height: isVisible ? 'auto' : '0',
      border: level === 1 ? '1px solid black' : '',
      backgroundColor: 'aquamarine',
    };

    if (nodes.length === 0) return null;

    return (
      <ul
        id={id}
        ref={ref}
        style={styles}
        className={`submenu ${level > 1 ? 'long-fadeIn' : 'short-fadeIn'}`}
        aria-hidden={isVisible ? false : true}
        role='menubar'
      >
        {nodes.map((n, i) => (
          <li key={Math.random()} className='submenu__item'>
            <NavNode node={n} level={level} />
          </li>
        ))}
      </ul>
    );
  }
);

export default Submenu;
