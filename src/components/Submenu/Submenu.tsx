import { CSSProperties, ForwardedRef } from 'react';
import NavNode from '../NavNode/NavNode';
import { NavNodeType } from '../types';
import { forwardRef } from 'react';

import './Submenu.css';

interface Props {
  nodes: NavNodeType[];
  isVisible: boolean;
  level: number;
  id: string;
}

const Submenu = forwardRef(
  (
    { nodes, isVisible, level, id }: Props,
    ref: ForwardedRef<HTMLUListElement>
  ) => {
    const styles: CSSProperties = {
      height: isVisible ? 'auto' : '0',
      border: level === 1 ? '1px solid black' : '',
      backgroundColor: 'aquamarine',
      opacity: level > 1 ? 0 : 1,
    };

    if (nodes.length === 0) return null;

    return (
      <ul
        id={id}
        ref={ref}
        style={styles}
        className={`submenu ${
          level === 1 ? 'short-fadeIn' : 'submenu--fade child-menu'
        }`}
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
