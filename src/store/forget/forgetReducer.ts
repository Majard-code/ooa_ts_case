import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { RequestStatus } from "../../utils/enums";

export interface IForgetState {
  readonly forgetStatus: RequestStatus,
  readonly errors: string[] | null,
  readonly message: string | null,
}

const initState: IForgetState = {
  forgetStatus: RequestStatus.Default,
  message: null,
  errors: null,
}

export const forget: Reducer<IForgetState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'FORGET_USER_START':
      return {
        ...state,
        forgetStatus: RequestStatus.Request,
      }
    case 'FORGET_USER_SUCCESS':
      return {
        ...state,
        forgetStatus: RequestStatus.Success,
        message: action.payload.result.message,
        errors: null,
      }
    case 'FORGET_USER_FAILED':
      return {
        ...state,
        forgetStatus: RequestStatus.Failed,
        message: null,
        errors: action.payload.errors,
      }
    case 'CLEAR_FORGET':
      return {
        ...state,
        errors: null,
        forgetStatus: RequestStatus.Default,
      }
    default:
      return state;
  }
}