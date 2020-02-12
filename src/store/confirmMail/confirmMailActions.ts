import { createAction, ActionsUnion } from "../action-helper";
import { IResponse, IError } from "../../utils/types";

export const CONFIRM_MAIL = 'CONFIRM_MAIL';
export const CONFIRM_MAIL_START = 'CONFIRM_MAIL_START';
export const CONFIRM_MAIL_SUCCESS = 'CONFIRM_MAIL_SUCCESS';
export const CONFIRM_MAIL_FAILED = 'CONFIRM_MAIL_FAILED';

export const ConfirmMailActions = {
  confirmMail: (payload: FormData) => createAction(CONFIRM_MAIL, payload),
  confirmMailStart: () => createAction(CONFIRM_MAIL_START),
  confirmMailSuccess: (payload: IResponse) => createAction(CONFIRM_MAIL_SUCCESS, payload),
  confirmMailFailed: (payload: IError) => createAction(CONFIRM_MAIL_FAILED, payload),  
}

export type TConfirmMailActions = ActionsUnion<typeof ConfirmMailActions>;
