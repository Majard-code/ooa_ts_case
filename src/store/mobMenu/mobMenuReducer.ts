import { Reducer } from "redux";
import { TAppActions } from "../actions";

export interface IMenuItem {
  id: number,
  name: string,
  url: string,
}

export interface IMobMenuState {
  readonly menuItems: IMenuItem[],
  readonly isOpen: boolean,
  readonly menuBtnRef: React.RefObject<HTMLDivElement> | null,
}

const initState: IMobMenuState = {
  menuItems: [
    {id: 4, name: 'МАСТЕР-КЛАССЫ', url: '/mcs'},
    {id: 3, name: 'РЕЦЕПТЫ', url: '/recipes'},
    {id: 2, name: 'КОНТАКТЫ', url: '/contacts'},
    {id: 1, name: 'ПОЛЬЗОВАТЕЛИ', url: '/users'},
  ],
  isOpen: false,
  menuBtnRef: null,
}

export const mobMenu: Reducer<IMobMenuState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'MOB_MENU_CLOSE':
      return {
        ...state,
        isOpen: false,
      }
    case 'MOB_MENU_OPEN':
      return {
        ...state,
        isOpen: true,
      }
      case 'SAVE_MENU_BTN_REF':
        return {
          ...state,
          menuBtnRef: action.payload,
        }
    default:
      return state;
  }
}