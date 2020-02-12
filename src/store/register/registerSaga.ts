import { takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { RegisterActions, REGISTER_USER } from './registerActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { IResponse, IError } from '../../utils/types';

type TRegisterUserAction = ReturnType<typeof RegisterActions.registerUser >

function* registerUser({ payload }: { payload: FormData }) {
  yield put(RegisterActions.registerUserStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('users/registration', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(RegisterActions.registerUserSuccess(data as IResponse));
    } else {
      yield put(RegisterActions.registerUserFailed(data as IError));
    }
  } catch(err) {
    yield put(RegisterActions.registerUserFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

export function* registerSaga() {
  yield takeLatest<TRegisterUserAction>(REGISTER_USER, registerUser);
}