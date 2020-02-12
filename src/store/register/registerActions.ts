import { createAction, ActionsUnion } from "../action-helper";
import { IResponse, IError } from "../../utils/types";

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_START = 'REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const CLEAR_REGISTER = 'CLEAR_REGISTER';

export const RegisterActions = {
  registerUser: (payload: FormData) => createAction(REGISTER_USER, payload),
  registerUserStart: () => createAction(REGISTER_USER_START),
  registerUserSuccess: (payload: IResponse) => createAction(REGISTER_USER_SUCCESS, payload),
  registerUserFailed: (payload: IError) => createAction(REGISTER_USER_FAILED, payload),
  clearRegister: () => createAction(CLEAR_REGISTER),
}

export type TRegisterActions = ActionsUnion<typeof RegisterActions>;
