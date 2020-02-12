import { createAction, ActionsUnion } from "../action-helper";
import { ConfirmForms } from "../../utils/enums";
import { IError, IResponse } from "../../utils/types";

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_USERS_START = 'GET_ALL_USERS_START';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILED = 'GET_ALL_USERS_FAILED';

export const OPEN_CONFIRM_FORM = 'OPEN_CONFIRM_FORM';
export const CLEAR_CONFIRM_FORM = 'CLEAR_CONFIRM_FORM';

export const EDIT_USER_ADMIN_TO_USER = 'EDIT_USER_ADMIN_TO_USER';
export const EDIT_USER_USER_TO_ADMIN = 'EDIT_USER_USER_TO_ADMIN';
export const EDIT_USER_DELETE_USER = 'EDIT_USER_DELETE_USER';
export const EDIT_USER_START = 'EDIT_USER_START';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

export interface IUser {
  name: string,
  email: string,
}

export interface IUsersResponse {
  result: {
    admins: IUser[],
    users: IUser[],
  }
}

export const UsersActions = {
  getAllUsers: () => createAction(GET_ALL_USERS),
  getAllUsersStart: () => createAction(GET_ALL_USERS_START),
  getAllUsersSuccess: (payload: IUsersResponse) => createAction(GET_ALL_USERS_SUCCESS, payload),
  getAllUsersFailed: (payload: IError) => createAction(GET_ALL_USERS_FAILED, payload),
  openConfirmForm: (payload: { confirmForm: ConfirmForms, userForEdit: IUser }) => createAction(OPEN_CONFIRM_FORM, payload),
  editUserAdminToUser: (payload: FormData) => createAction(EDIT_USER_ADMIN_TO_USER, payload),
  editUserUserToAdmin: (payload: FormData) => createAction(EDIT_USER_USER_TO_ADMIN, payload),
  editUserDeleteUser: (payload: FormData) => createAction(EDIT_USER_DELETE_USER, payload),
  editUserStart: () => createAction(EDIT_USER_START),
  editUserSuccess: (payload: IResponse) => createAction(EDIT_USER_SUCCESS, payload),
  editUserFailed: (payload: IError) => createAction(EDIT_USER_FAILED, payload),  
  clearConfirmForm: () => createAction(CLEAR_CONFIRM_FORM),
}

export type TUsersActions = ActionsUnion<typeof UsersActions>;
