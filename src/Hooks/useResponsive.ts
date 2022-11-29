import { useState, useEffect } from 'react';

function getScreenWidth() {
  const { innerWidth } = window;
  return innerWidth;
}

const useResponsive = (breakpoint: number) => {
  const [screen, setScreen] = useState(getScreenWidth());

  function handleResize() {
    setScreen(getScreenWidth());
  }

  useEffect(() => {
    let subscribe = true;
    if (subscribe) {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        subscribe = false;
      };
    }
  }, [handleResize]);

  return screen <= breakpoint;
};

export default useResponsive;
