import { createAction, ActionsUnion } from "../action-helper";
import { AccountEdit } from "../../utils/enums";
import { IResponse, IError } from "../../utils/types";

export const CHANGE_ACCOUNT_EDIT = 'CHANGE_ACCOUNT_EDIT';
export const CLEAR_ACCOUNT_EDIT = 'CLEAR_ACCOUNT_EDIT';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const ANY_CHANGE_START = 'ANY_CHANGE_START';
export const ANY_CHANGE_SUCCESS = 'ANY_CHANGE_SUCCESS';
export const ANY_CHANGE_FAILED = 'ANY_CHANGE_FAILED';

export const AccountActions = {
  changeAccountEdit: (payload: AccountEdit | null) => createAction(CHANGE_ACCOUNT_EDIT, payload),
  clearAccountEdit: () => createAction(CLEAR_ACCOUNT_EDIT),
  changeName: (payload: FormData) => createAction(CHANGE_NAME, payload),
  changePassword: (payload: FormData) => createAction(CHANGE_PASSWORD, payload),
  anyChangeStart: () => createAction(ANY_CHANGE_START),
  anyChangeSuccess: (payload: IResponse) => createAction(ANY_CHANGE_SUCCESS, payload),
  anyChangeFailed: (payload: IError) => createAction(ANY_CHANGE_FAILED, payload),
}

export type TAccountActions = ActionsUnion<typeof AccountActions>;
