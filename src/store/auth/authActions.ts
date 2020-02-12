import { createAction, ActionsUnion } from "../action-helper";
import { UserStatus } from "../../utils/enums";
import { IError } from "../../utils/types";

export const CHECK_USER = 'CHECK_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTH_USER_START = 'AUTH_USER_START';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILED = 'AUTH_USER_FAILED';
export const AUTH_USER_CLOSED = 'AUTH_USER_CLOSED';
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';

export interface IAuthResponse {
  result: {
    user: {
      name: string,
      email: string,
      status: UserStatus,
    }
  },
}

export const AuthActions = {
  loginUser: (payload: FormData) => createAction(LOGIN_USER, payload),
  logoutUser: () => createAction(LOGOUT_USER),
  checkUser: () => createAction(CHECK_USER),
  authUserStart: () => createAction(AUTH_USER_START),
  authUserSuccess: (payload: IAuthResponse) => createAction(AUTH_USER_SUCCESS, payload),
  authUserFailed: (payload: IError) => createAction(AUTH_USER_FAILED, payload),
  authUserClosed: () => createAction(AUTH_USER_CLOSED),
  clearUserErrors: () => createAction(CLEAR_USER_ERRORS),
}

export type TAuthActions = ActionsUnion<typeof AuthActions>;
