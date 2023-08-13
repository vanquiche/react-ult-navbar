export enum ActionTypes {
  CLOSE_ALL = 'CLOSE_ALL',
  OPEN = 'OPEN',
}

export type ReducerAction = {
  type: ActionTypes;
  payload: string;
};

type MenusType = Record<string, boolean>;

interface ReducerProps {
  state: MenusType;
  action: ReducerAction;
}

export function topLevelMenuReducer(state: MenusType, action: ReducerAction) {
  // dont mutate original state
  const copyMenus = { ...state };
  for (const prop in copyMenus) {
    // close all other menus, while toggling current
    if (action.type === ActionTypes.OPEN) {
      if (action.payload !== prop) {
        copyMenus[prop] = false;
      } else {
        copyMenus[prop] = !copyMenus[prop];
      }
    }
  }
  return copyMenus;
}
