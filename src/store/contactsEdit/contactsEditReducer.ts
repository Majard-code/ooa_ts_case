import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { RequestStatus, ContactsEdit } from "../../utils/enums";

export interface IContactsEditState {
  readonly contactsEdit: ContactsEdit | null,
  readonly contactsEditStatus: RequestStatus,
  readonly errors: string[] | null,
  readonly message: string | null,
}

const initState: IContactsEditState = {
  contactsEdit: null,
  contactsEditStatus: RequestStatus.Default,
  message: null,
  errors: null,
}

export const contactsEdit: Reducer<IContactsEditState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_CONTACTS_EDIT':
      return {
        ...state,
        contactsEdit: action.payload,
      }
    case 'CLEAR_CONTACTS_EDIT':
      return {
        ...state,
        contactsEdit: null,
        contactsEditStatus: RequestStatus.Default,
        message: null,
        errors: null,
      }
      case 'CONTACTS_EDIT_START':
        return {
          ...state,
          contactsEditStatus: RequestStatus.Request,
        }
      case 'CONTACTS_EDIT_SUCCESS':
        console.log(action.payload)
        return {
          ...state,
          contactsEditStatus: RequestStatus.Success,
          message: action.payload.result.message,
          errors: null,
        }
      case 'CONTACTS_EDIT_FAILED':
        console.log(action.payload)
        return {
          ...state,
          contactsEditStatus: RequestStatus.Failed,
          message: null,
          errors: action.payload.errors,
        }
    default:
      return state;
  }
}