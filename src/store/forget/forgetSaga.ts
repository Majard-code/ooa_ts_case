import { takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { ForgetActions, FORGET_USER } from './forgetActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { IResponse, IError } from '../../utils/types';

type TForgetAction = ReturnType<typeof ForgetActions.forgetUser>

function* forgetUser({ payload }: { payload: FormData }) {
  yield put(ForgetActions.forgetUserStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('users/forget', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(ForgetActions.forgetUserSuccess(data as IResponse));
    } else {
      yield put(ForgetActions.forgetUserFailed(data as IError));
    }
  } catch(err) {
    yield put(ForgetActions.forgetUserFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

export function* forgetSaga() {
  yield takeLatest<TForgetAction>(FORGET_USER, forgetUser);
}