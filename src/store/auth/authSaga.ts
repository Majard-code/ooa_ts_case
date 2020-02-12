import { takeLatest, delay, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { AuthActions, LOGIN_USER, IAuthResponse, CHECK_USER, LOGOUT_USER } from './authActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { AccountActions } from '../account/accountActions';
import { IError } from '../../utils/types';

type TLoginUserAction = ReturnType<typeof AuthActions.loginUser>;
type TLogoutUserAction = ReturnType<typeof AuthActions.logoutUser>;
type TCheckUserAction = ReturnType<typeof AuthActions.checkUser>;

function* loginUser({ payload }: { payload: FormData }) {
  yield put(AuthActions.authUserStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IAuthResponse | IError = yield call(() => axios.post('users/login', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(AuthActions.authUserSuccess(data as IAuthResponse));
    } else {
      yield put(AuthActions.authUserFailed(data as IError));
    }
  } catch(err) {
      yield put(AuthActions.authUserFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

function* checkUser() {
  yield put(AuthActions.authUserStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IAuthResponse | IError = yield call(() => axios.get('users/check').then(res => res.data));
    if(!(data as IError).errors) {
      yield put(AuthActions.authUserSuccess(data as IAuthResponse));
    } else {
      yield put(AuthActions.authUserFailed(data as IError));
    }
  } catch(err) {
      yield put(AuthActions.authUserFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

function* logoutUser() {
  yield put(AccountActions.clearAccountEdit());
  try {
    yield call(() => axios.post('users/logout'));
    yield put(AuthActions.authUserClosed());
  } catch(err) {
      yield console.log('error');
  }
}

export function* authSaga() {
  yield takeLatest<TLoginUserAction>(LOGIN_USER, loginUser);
  yield takeLatest<TLogoutUserAction>(LOGOUT_USER, logoutUser);
  yield takeLatest<TCheckUserAction>(CHECK_USER, checkUser);
}