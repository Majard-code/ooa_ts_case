import { all } from 'redux-saga/effects';
import axios from 'axios';
import { registerSaga } from './register/registerSaga';
import { authSaga } from './auth/authSaga';
import { confirmMailSaga } from './confirmMail/confirmMailSaga';
import { accountSaga } from './account/accountSaga';
import { usersSaga } from './users/usersSaga';
import { forgetSaga } from './forget/forgetSaga';
import { contactsSaga } from './contacts/contactsSaga';
import { contactsEditSaga } from './contactsEdit/contactsEditSaga';
import { mcsSaga } from './mcs/mcsSaga';
import { mcsEditSaga } from './mcsEdit/mcsEditSaga';
import { apiUrl } from '../utils/urls';

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

export function* mamaSaga() {
  yield all([
    registerSaga(),
    authSaga(),
    confirmMailSaga(),
    accountSaga(),
    usersSaga(),
    forgetSaga(),
    contactsSaga(),
    contactsEditSaga(),
    mcsSaga(),
    mcsEditSaga(),
  ]);
}
