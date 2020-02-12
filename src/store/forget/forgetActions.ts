import { createAction, ActionsUnion } from "../action-helper";
import { IResponse, IError } from "../../utils/types";

export const FORGET_USER = 'FORGET_USER';
export const FORGET_USER_START = 'FORGET_USER_START';
export const FORGET_USER_SUCCESS = 'FORGET_USER_SUCCESS';
export const FORGET_USER_FAILED = 'FORGET_USER_FAILED';
export const CLEAR_FORGET = 'CLEAR_FORGET';

export const ForgetActions = {
  forgetUser: (payload: FormData) => createAction(FORGET_USER, payload),
  forgetUserStart: () => createAction(FORGET_USER_START),
  forgetUserSuccess: (payload: IResponse) => createAction(FORGET_USER_SUCCESS, payload),
  forgetUserFailed: (payload: IError) => createAction(FORGET_USER_FAILED, payload),
  clearForget: () => createAction(CLEAR_FORGET),
}

export type TForgetActions = ActionsUnion<typeof ForgetActions>;
