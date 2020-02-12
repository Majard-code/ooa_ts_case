import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { UserStatus } from "../../utils/enums";

export interface IAuthState {
  readonly userStatus: UserStatus,
  readonly name: string | null,
  readonly email: string | null,
  readonly errors: string[] | null,
}

const initState: IAuthState = {
  userStatus: UserStatus.Request,
  name: null,
  email: null,
  errors: null,
}

export const auth: Reducer<IAuthState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'AUTH_USER_START':
      return {
        ...state,
        userStatus: UserStatus.Request,
      }
    case 'AUTH_USER_SUCCESS':
      return {
        ...state,
        userStatus: action.payload.result.user.status,
        name: action.payload.result.user.name,
        email: action.payload.result.user.email,
        errors: null,
      }
    case 'AUTH_USER_FAILED':
      return {
        ...state,
        userStatus: UserStatus.Unauthorized,
        name: null,
        email: null,
        errors: action.payload.errors,
      }
    case 'AUTH_USER_CLOSED':
      return {
        ...state,
        userStatus: UserStatus.Unauthorized,
        name: null,
        email: null,
        errors: null,
      }
    case 'CLEAR_USER_ERRORS':
      return {
        ...state,
        errors: null,
      }
    default:
      return state;
  }
}