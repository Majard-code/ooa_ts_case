import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { RequestStatus } from "../../utils/enums";

export interface IContactsState {
  readonly contacts: {
    phone: string,
    address: string,
    lat: number,
    lon: number,
  } | null,
  readonly getContactsStatus: RequestStatus,
  readonly errors: string[] | null,
}

const initState: IContactsState = {
  contacts: null,
  getContactsStatus: RequestStatus.Default,
  errors: null,
}

export const contacts: Reducer<IContactsState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CONTACTS_START':
      return {
        ...state,
        getContactsStatus: RequestStatus.Request,
      }
    case 'GET_CONTACTS_SUCCESS':
      return {
        ...state,
        getContactsStatus: RequestStatus.Success,
        contacts: action.payload.result.contacts,
        errors: null,
      }
    case 'GET_CONTACTS_FAILED':
      return {
        ...state,
        getContactsStatus: RequestStatus.Failed,
        contacts: null,
        errors: action.payload.errors,
      }
    default:
      return state;
  }
}