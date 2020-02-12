import { createAction, ActionsUnion } from "../action-helper";
import { IError } from "../../utils/types";

export const GET_CONTACTS = 'GET_CONTACTS';
export const GET_CONTACTS_START = 'GET_CONTACTS_START';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS';
export const GET_CONTACTS_FAILED = 'GET_CONTACTS_FAILED';

export interface IContactsResponse {
  result: {
    contacts: {
      phone: string,
      address: string,
      lat: number,
      lon: number,
    }
  }
}

export const ContactsActions = {
  getContacts: () => createAction(GET_CONTACTS),
  getContactsStart: () => createAction(GET_CONTACTS_START),
  getContactsSuccess: (payload: IContactsResponse) => createAction(GET_CONTACTS_SUCCESS, payload),
  getContactsFailed: (payload: IError) => createAction(GET_CONTACTS_FAILED, payload),
}

export type TContactsActions = ActionsUnion<typeof ContactsActions>;
