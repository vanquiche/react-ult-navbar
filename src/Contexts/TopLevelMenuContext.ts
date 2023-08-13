import { Dispatch, SetStateAction, createContext } from 'react';

type menus = Record<string, boolean>;

interface TopLevelMenuContextType {
  topLevelMenus: menus;
  setTopLevelMenus: Dispatch<SetStateAction<menus>>;
}

const defaultContext: TopLevelMenuContextType = {
  topLevelMenus: {},
  setTopLevelMenus: () => {},
};

const TopLevelMenuContext = createContext(defaultContext);

export default TopLevelMenuContext;
