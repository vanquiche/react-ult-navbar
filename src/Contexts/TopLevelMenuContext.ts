import { Dispatch, createContext } from 'react';
import { ReducerAction } from '../Reducers/topLevelMenuReducers';

interface DefaultContextType {
  topLevelMenus: Record<string, boolean>;
  setTopLevelMenus: Dispatch<ReducerAction>;
}
const defaultContext = {
  topLevelMenus: {},
  setTopLevelMenus: () => null,
};

const TopLevelMenuContext = createContext<DefaultContextType>(defaultContext);

export default TopLevelMenuContext;
