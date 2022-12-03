import { CSSProperties, useEffect, useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import LinkItem from '../LinkItem/LinkItem';
import { NavigationNode } from '../types';

const DesktopMenu = ({ navigation }: { navigation: NavigationNode[] }) => {
  const [link, setLink] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const navREF = useRef<HTMLElement | null>(null);
  // when clicked on link then
  // render the dropdown menu
  // with the data that is a child of link

  const dropwdownStyles: CSSProperties = {
    height: openMenu ? 'auto' : 0,
  };

  const openDropdownMenu = (index: number) => () => {
    setLink(index);
    if (!openMenu) {
      setOpenMenu(true);
    }
  };

  useEffect(() => {
    function handleClickEvent(e: Event) {
      if (!openMenu) return;
      const nav = navREF;
    }
    document.addEventListener('click', handleClickEvent);
  }, []);

  return (
    // main nav
    <nav ref={navREF}>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: '5px 25px',
          flexWrap: 'wrap',
        }}
      >
        {navigation.map((node, i) => {
          return node.dropdown ? (
            <li key={i} style={{ color: 'red' }} onClick={openDropdownMenu(i)}>
              {node.name}
            </li>
          ) : (
            <li key={i}>{node.name}</li>
          );
        })}
      </ul>

      {/* sub nav */}
      {/* relative position */}
      <div style={dropwdownStyles}>
        {navigation
          .filter((_, i) => i === link)
          .map(
            (node, i) =>
              node.dropdown && (
                <Dropdown key={Math.random()} navigation={node.dropdown} />
              )
          )}
      </div>
    </nav>
  );
};

export default DesktopMenu;
