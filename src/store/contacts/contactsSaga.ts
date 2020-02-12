import { takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { ContactsActions, GET_CONTACTS, IContactsResponse } from './contactsActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { IError } from '../../utils/types';

type TFetchContactsAction = ReturnType<typeof ContactsActions.getContacts>

function* getContacts() {
  yield put(ContactsActions.getContactsStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IContactsResponse | IError = yield call(() => axios.post('contacts/get-all').then(res => res.data));
    if(!(data as IError).errors) {
      yield put(ContactsActions.getContactsSuccess(data as IContactsResponse));
    } else {
      yield put(ContactsActions.getContactsFailed(data as IError));
    }
  } catch(err) {
    yield put(ContactsActions.getContactsFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

export function* contactsSaga() {
  yield takeLatest<TFetchContactsAction>(GET_CONTACTS, getContacts);
}