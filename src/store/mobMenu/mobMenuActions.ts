import { createAction, ActionsUnion } from "../action-helper";

export const MOB_MENU_OPEN = 'MOB_MENU_OPEN';
export const MOB_MENU_CLOSE = 'MOB_MENU_CLOSE';
export const SAVE_MENU_BTN_REF = 'SAVE_MENU_BTN_REF';

export const MobMenuActions = {
  mobMenuOpen: () => createAction(MOB_MENU_OPEN),
  mobMenuClose: () => createAction(MOB_MENU_CLOSE),
  saveMenuBtnRef: (payload: React.RefObject<HTMLDivElement>) => createAction(SAVE_MENU_BTN_REF, payload),
}

export type TMobMenuActions = ActionsUnion<typeof MobMenuActions>;
