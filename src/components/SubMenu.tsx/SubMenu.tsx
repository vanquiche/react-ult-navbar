import React, {
  CSSProperties,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ThemeContext from '../../Contexts/ThemeContext';
import useResponsive from '../../Hooks/useResponsive';
import LinkItem from '../LinkItem/LinkItem';
import { NavigationNode } from '../types';
import styles from './SubMenu.module.css';
import { MOBILE_QUERY } from '../../VALUES';

const SubMenu = ({
  navigation,
  name,
}: {
  navigation: NavigationNode[];
  name: string;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { themes } = useContext(ThemeContext);
  const isMobile = useResponsive(MOBILE_QUERY);
  const menuLeftOffset = useRef<number | null>(null);
  const screenMiddlePoint = useRef<number | null>(null);

  const menuDisplayStyle: CSSProperties = {
    height: showMenu ? 'auto' : '0',
    // opacity: showMenu ? 1 : 0,
    // transition: 'opacity 200ms ease-out',
  };

  const menuPositionStyle: CSSProperties | undefined = useMemo(() => {
    if (menuLeftOffset.current && screenMiddlePoint.current) {
      if (menuLeftOffset.current > screenMiddlePoint.current) {
        return {
          right: 0,
        };
      } else {
        return {
          left: 0,
        };
      }
    }
  }, [menuLeftOffset.current, screenMiddlePoint.current]);

  const listAnimationStyles = (position: number): CSSProperties => ({
    transform: `translateY(${showMenu ? 0 : `${(1 + position) * -100}px`})`,
    transition: 'transform 125ms ease-out',
  });

  const mobileTitleStyles: CSSProperties = {
    cursor: 'pointer',
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const getLeftOffsetCoordinate = (el: HTMLElement | null) => {
    if (el) menuLeftOffset.current = el.getBoundingClientRect().left;
  };

  // close menu on window size transition
  useEffect(() => {
    screenMiddlePoint.current = window.innerWidth * 0.6;
    return () => setShowMenu(false);
  }, [isMobile]);

  return (
    <div
      className={styles.container}
      // enable hover to expand menu only when in desktop
      onMouseEnter={!isMobile ? openMenu : undefined}
      onMouseLeave={!isMobile ? closeMenu : undefined}
      ref={(el) => getLeftOffsetCoordinate(el)}
      // enable tab navigation
      tabIndex={0}
    >
      <span
        className={styles.title}
        style={isMobile ? mobileTitleStyles : undefined}
        onClick={isMobile ? toggleMenu : undefined}
        role='menuitem'
      >
        {name} &#9660;
      </span>

      {
        <ul
          style={{ ...menuDisplayStyle, ...themes, ...menuPositionStyle }}
          className={`${styles.dropdown} ${
            isMobile ? styles.posRelative : styles.posAbsolute
          }`}
          onFocus={openMenu}
        >
          {navigation.map((node, i) => {
            return node.href ? (
              <li
                key={i}
                className={styles.linkContainer}
                style={listAnimationStyles(i)}
              >
                <LinkItem name={node.name} href={node.href} />
              </li>
            ) : (
              <li
                key={i}
                className={styles.linkContainer}
                style={listAnimationStyles(i)}
              >
                {node.linkElement}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default React.memo(SubMenu);
