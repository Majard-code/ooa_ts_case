import { createAction, ActionsUnion } from "../action-helper";
import { ContactsEdit } from "../../utils/enums";
import { IResponse, IError } from "../../utils/types";

export const CHANGE_CONTACTS_EDIT = 'CHANGE_CONTACTS_EDIT';
export const CONTACTS_EDIT_PHONE = 'CONTACTS_EDIT_PHONE';
export const CONTACTS_EDIT_ADDRESS = 'CONTACTS_EDIT_ADDRESS';
export const CONTACTS_EDIT_COORDINATES = 'CONTACTS_EDIT_COORDINATES';
export const CONTACTS_EDIT_START = 'CONTACTS_EDIT_START';
export const CONTACTS_EDIT_SUCCESS = 'CONTACTS_EDIT_SUCCESS';
export const CONTACTS_EDIT_FAILED = 'CONTACTS_EDIT_FAILED';
export const CLEAR_CONTACTS_EDIT = 'CLEAR_CONTACTS_EDIT';

export const ContactsEditActions = {
  changeContactsEdit: (payload: ContactsEdit | null) => createAction(CHANGE_CONTACTS_EDIT, payload),

  contactsEditPhone: (payload: FormData) => createAction(CONTACTS_EDIT_PHONE, payload),
  contactsEditAddress: (payload: FormData) => createAction(CONTACTS_EDIT_ADDRESS, payload),
  contactsEditCoordinates: (payload: FormData) => createAction(CONTACTS_EDIT_COORDINATES, payload),

  contactsEditStart: () => createAction(CONTACTS_EDIT_START),
  contactsEditSuccess: (payload: IResponse) => createAction(CONTACTS_EDIT_SUCCESS, payload),
  contactsEditFailed: (payload: IError) => createAction(CONTACTS_EDIT_FAILED, payload),

  clearContactsEdit: () => createAction(CLEAR_CONTACTS_EDIT),
}

export type TContactsEditActions = ActionsUnion<typeof ContactsEditActions>;
