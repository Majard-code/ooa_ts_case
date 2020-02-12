import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { RequestStatus, ConfirmForms } from "../../utils/enums";
import { IUser } from "./usersActions";

export interface IUsersState {
  readonly usersFetchStatus: RequestStatus,
  readonly editUserStatus: RequestStatus,
  readonly confirmForm: ConfirmForms,
  readonly admins: IUser[] | null,
  readonly users: IUser[] | null,
  readonly errors: string[] | null,
  readonly userForEdit: IUser | null,
  readonly editingErrors: string[] | null,
  readonly editingMessage: string | null,
}

const initState: IUsersState = {
  usersFetchStatus: RequestStatus.Default,
  editUserStatus: RequestStatus.Default,
  confirmForm: ConfirmForms.Off,
  admins: null,
  users: null,
  errors: null,
  userForEdit: null,
  editingErrors: null,
  editingMessage: null,
}

export const users: Reducer<IUsersState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS_START':
      return {
        ...state,
        usersFetchStatus: RequestStatus.Request,
      }
    case 'GET_ALL_USERS_SUCCESS':
      return {
        ...state,
        usersFetchStatus: RequestStatus.Success,
        admins: action.payload.result.admins,
        users: action.payload.result.users,
        errors: null,
      }
    case 'GET_ALL_USERS_FAILED':
      return {
        ...state,
        usersFetchStatus: RequestStatus.Failed,
        admins: null,
        users: null,
        errors: action.payload.errors,
      }
    case 'OPEN_CONFIRM_FORM':
      return {
        ...state,
        confirmForm: action.payload.confirmForm,
        userForEdit: action.payload.userForEdit,
        editingErrors: null,
      }
    case 'CLEAR_CONFIRM_FORM':
      return {
        ...state,
        confirmForm: ConfirmForms.Off,
        userForEdit: null,
        editingErrors: null,
        editingMessage: null,
      }
    case 'EDIT_USER_START':
      return {
        ...state,
        editUserStatus: RequestStatus.Request,
      }
    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        confirmForm: ConfirmForms.Success,
        editUserStatus: RequestStatus.Success,
        editingMessage: action.payload.result.message,
        editingErrors: null,
      }
    case 'EDIT_USER_FAILED':
      return {
        ...state,
        editUserStatus: RequestStatus.Failed,
        editingMessage: null,
        editingErrors: action.payload.errors,
      }
    default:
      return state;
  }
}