import React, {
  CSSProperties,
  useState,
  useRef,
  SyntheticEvent,
  useEffect,
} from 'react';
import { NavigationNode } from '../types';

const SubMenu = ({ navigation }: { navigation: NavigationNode[] }) => {
  const [showMenu, setShowMenu] = useState(false);
  const nodeRef = useRef(null);
  const hasRender = useRef(false);

  const menuDisplayStyle: CSSProperties = {
    display: showMenu ? 'block' : 'none',
    position: 'absolute',
    whiteSpace: 'nowrap',
    outline: '1px solid green',
    padding: '0 10px',
  };

  function toggleDisplay() {
    setShowMenu(true);
  }

  function checkTarget(e?: any) {
    // console.log(nodeRef);
    console.log(e);
    console.log(e?.currentTarget === nodeRef.current);

    const userLeftMenu = e?.currentTarget !== nodeRef.current;

    if (userLeftMenu) {
      setShowMenu(false);
    }
  }

  useEffect(() => {
    window.addEventListener('mouseenter', (e) => {
      console.log(e?.currentTarget === nodeRef.current);

      const userLeftMenu = e?.currentTarget !== nodeRef.current;

      if (userLeftMenu) {
        setShowMenu(false);
      }
    });

    // return () => {
    //   window.removeEventListener('mouseenter', checkTarget);
    // };
  }, [nodeRef]);

  return (
    <>
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          outline: '1px solid blue',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        onMouseEnter={toggleDisplay}
        // onMouseLeave={toggleDisplay}
      ></span>
      <ul style={menuDisplayStyle} ref={nodeRef}>
        {navigation.map((node, i) => {
          return node.name ? (
            <li key={i}>{node.name}</li>
          ) : (
            <li key={i}>{node.linkElement}</li>
          );
        })}
      </ul>
    </>
  );
};

export default React.memo(SubMenu);
