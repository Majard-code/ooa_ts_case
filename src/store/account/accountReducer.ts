import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { AccountEdit, RequestStatus } from "../../utils/enums";

export interface IAccountState {
  readonly accountEdit: AccountEdit | null,
  readonly accountEditStatus: RequestStatus,
  readonly errors: string[] | null,
  readonly message: string | null,
}

const initState: IAccountState = {
  accountEdit: null,
  accountEditStatus: RequestStatus.Default,
  message: null,
  errors: null,
}

export const account: Reducer<IAccountState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_ACCOUNT_EDIT':
      return {
        ...state,
        accountEdit: action.payload,
      }
    case 'CLEAR_ACCOUNT_EDIT':      
      return {
        ...state,
        accountEdit: null,
        accountEditStatus: RequestStatus.Default,
        message: null,
        errors: null,
      }
    case 'ANY_CHANGE_START':
      return {
        ...state,
        accountEditStatus: RequestStatus.Request,
      }
    case 'ANY_CHANGE_SUCCESS':
      return {
        ...state,
        accountEditStatus: RequestStatus.Success,
        message: action.payload.result.message,
        errors: null,
      }
    case 'ANY_CHANGE_FAILED':
      return {
        ...state,
        accountEditStatus: RequestStatus.Failed,
        message: null,
        errors: action.payload.errors,
      }
    default:
      return state;
  }
}