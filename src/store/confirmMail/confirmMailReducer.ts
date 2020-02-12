import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { RequestStatus } from "../../utils/enums";

export interface IConfirmMailState {
  readonly confirmMailStatus: RequestStatus,
  readonly message: string | null,
  readonly errors: string[] | null,
}

const initState: IConfirmMailState = {
  confirmMailStatus: RequestStatus.Default,
  message: null,
  errors: null,
}

export const confirmMail: Reducer<IConfirmMailState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'CONFIRM_MAIL_START':
      return {
        ...state,
        confirmMailStatus: RequestStatus.Request,
      }
    case 'CONFIRM_MAIL_SUCCESS':
      return {
        ...state,
        confirmMailStatus: RequestStatus.Success,
        message: action.payload.result.message,
        errors: null,
      }
    case 'CONFIRM_MAIL_FAILED':
      return {
        ...state,
        confirmMailStatus: RequestStatus.Failed,
        errors: action.payload.errors,
      }
    default:
      return state;
  }
}