import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { RequestStatus } from "../../utils/enums";

export interface IRegisterState {
  readonly registerStatus: RequestStatus,
  readonly errors: string[] | null,
  readonly message: string | null,
}

const initState: IRegisterState = {
  registerStatus: RequestStatus.Default,
  message: null,
  errors: null,
}

export const register: Reducer<IRegisterState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'REGISTER_USER_START':
      return {
        ...state,
        registerStatus: RequestStatus.Request,
      }
    case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        registerStatus: RequestStatus.Success,
        message: action.payload.result.message,
        errors: null,
      }
    case 'REGISTER_USER_FAILED':
      return {
        ...state,
        registerStatus: RequestStatus.Failed,
        message: null,
        errors: action.payload.errors,
      }
    case 'CLEAR_REGISTER':
      return {
        ...state,
        errors: null,
        registerStatus: RequestStatus.Default,
      }
    default:
      return state;
  }
}