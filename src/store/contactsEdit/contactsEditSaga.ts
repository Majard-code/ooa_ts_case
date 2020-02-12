import { takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { ContactsEditActions, CONTACTS_EDIT_PHONE, CONTACTS_EDIT_ADDRESS, CONTACTS_EDIT_COORDINATES } from './contactsEditActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { ContactsActions } from '../contacts/contactsActions';
import { IResponse, IError } from '../../utils/types';

type TContactsEditPhoneAction = ReturnType<typeof ContactsEditActions.contactsEditPhone>
type TContactsEditAddressAction = ReturnType<typeof ContactsEditActions.contactsEditAddress>
type TContactsEditCoordinatesAction = ReturnType<typeof ContactsEditActions.contactsEditCoordinates>

function* contactsEditPhone({ payload }: { payload: FormData }) {
  yield put(ContactsEditActions.contactsEditStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('contacts/edit-phone', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(ContactsEditActions.contactsEditSuccess(data as IResponse));
      yield put(ContactsActions.getContacts());
    } else {
      yield put(ContactsEditActions.contactsEditFailed(data as IError));
    }
  } catch(err) {
    yield put(ContactsEditActions.contactsEditFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

function* contactsEditAddress({ payload }: { payload: FormData }) {
  yield put(ContactsEditActions.contactsEditStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('contacts/edit-address', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(ContactsEditActions.contactsEditSuccess(data as IResponse));
      yield put(ContactsActions.getContacts());
    } else {
      yield put(ContactsEditActions.contactsEditFailed(data as IError));
    }
  } catch(err) {
    yield put(ContactsEditActions.contactsEditFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

function* contactsEditCoordinates({ payload }: { payload: FormData }) {
  yield put(ContactsEditActions.contactsEditStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('contacts/edit-coordinates', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(ContactsEditActions.contactsEditSuccess(data as IResponse));
      yield put(ContactsActions.getContacts());
    } else {
      yield put(ContactsEditActions.contactsEditFailed(data as IError));
    }
  } catch(err) {
    yield put(ContactsEditActions.contactsEditFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

export function* contactsEditSaga() {
  yield takeLatest<TContactsEditPhoneAction>(CONTACTS_EDIT_PHONE, contactsEditPhone);
  yield takeLatest<TContactsEditAddressAction>(CONTACTS_EDIT_ADDRESS, contactsEditAddress);
  yield takeLatest<TContactsEditCoordinatesAction>(CONTACTS_EDIT_COORDINATES, contactsEditCoordinates);
}