import { takeLatest, delay, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { AccountActions, CHANGE_NAME, CHANGE_PASSWORD } from './accountActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { AuthActions } from '../auth/authActions';
import { IResponse, IError } from '../../utils/types';

type TChangeNameAction = ReturnType<typeof AccountActions.changeName>;
type TChangePasswordAction = ReturnType<typeof AccountActions.changePassword>;

function* changeName({ payload }: { payload: FormData }) {
  yield put(AccountActions.anyChangeStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('users/change-name', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(AccountActions.anyChangeSuccess(data as IResponse));
      yield put(AuthActions.checkUser());
    } else {
      yield put(AccountActions.anyChangeFailed(data as IError));
    }
  } catch(err) {
      yield put(AccountActions.anyChangeFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

function* changePassword({ payload }: { payload: FormData }) {
  yield put(AccountActions.anyChangeStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('users/change-password', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(AccountActions.anyChangeSuccess(data as IResponse));
    } else {
      yield put(AccountActions.anyChangeFailed(data as IError));
    }
  } catch(err) {
      yield put(AccountActions.anyChangeFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

export function* accountSaga() {
  yield takeLatest<TChangeNameAction>(CHANGE_NAME, changeName);
  yield takeLatest<TChangePasswordAction>(CHANGE_PASSWORD, changePassword);
}