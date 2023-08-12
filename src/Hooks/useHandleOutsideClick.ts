import { useEffect } from 'react';

const useHandleOutsideClick = (
  dataAttribute: string,
  state: boolean,
  callback: () => void
) => {
  useEffect(() => {
    const eventHandler = (e: Event) => {
      // if menu is not open do nothing
      if (!state) return;
      const link = e.target as HTMLElement;
      // check if item has data attribute of drowpdown
      const insideNav = dataAttribute in link.dataset;
      if (insideNav) return;
      if (!insideNav) {
        callback();
      }
    };

    if (state) {
      document.addEventListener('click', eventHandler);
    } else {
      document.removeEventListener('click', eventHandler);
    }

    return () => {
      document.removeEventListener('click', eventHandler);
    };
  }, [state]);
};

export default useHandleOutsideClick;
