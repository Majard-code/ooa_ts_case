import { reducer as form, FormStateMap } from 'redux-form';
import { TAppActions } from "./actions";
import { combineReducers } from "redux";
import { IRegisterState, register } from "./register/registerReducer";
import { IMobMenuState, mobMenu } from "./mobMenu/mobMenuReducer";
import { IAuthState, auth } from "./auth/authReducer";
import { IConfirmMailState, confirmMail } from "./confirmMail/confirmMailReducer";
import { IAccountState, account } from "./account/accountReducer";
import { IUsersState, users } from './users/usersReducer';
import { IForgetState, forget } from './forget/forgetReducer';
import { IContactsState, contacts } from './contacts/contactsReducer';
import { IContactsEditState, contactsEdit } from './contactsEdit/contactsEditReducer';
import { IMcsState, mcs } from './mcs/mcsReducer';
import { IMcsEditState, mcsEdit } from './mcsEdit/mcsEditReducer';

export interface IAppState {
  form: FormStateMap,
  register: IRegisterState,
  mobMenu: IMobMenuState,
  auth: IAuthState,
  confirmMail: IConfirmMailState,
  account: IAccountState,
  users: IUsersState,
  forget: IForgetState,
  contacts: IContactsState,
  contactsEdit: IContactsEditState,
  mcs: IMcsState,
  mcsEdit: IMcsEditState,
}

export const rootReducer: (state: IAppState, action: TAppActions) => IAppState = combineReducers<IAppState, TAppActions>({
  form,
  register,
  mobMenu,
  auth,
  confirmMail,
  account,
  users,
  forget,
  contacts,
  contactsEdit,
  mcs,
  mcsEdit,
});