import { CSSProperties, ForwardedRef } from 'react';
import NavNode from '../NavNode/NavNode';
import { NavNodeType } from '../types';
import { forwardRef } from 'react';

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
      marginLeft: '12px',
      visibility: isVisible ? 'visible' : 'hidden',
      height: isVisible ? 'auto' : '0',
      position: 'absolute',
    };

    if (nodes.length === 0) return null;

    return (
      <ul
        id={id}
        style={styles}
        aria-hidden={isVisible ? false : true}
        role='menubar'
        ref={ref}
      >
        {nodes.map((n, i) => (
          <li key={Math.random()}>
            <NavNode node={n} level={level} />
          </li>
        ))}
      </ul>
    );
  }
);

export default Submenu;
