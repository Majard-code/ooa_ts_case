import { takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { McsActions, IMcsResponse, GET_MCS } from './mcsActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { IError } from '../../utils/types';

type TGetMcsAction = ReturnType<typeof McsActions.getMcs>

function* getMcs() {
  yield put(McsActions.getMcsStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IMcsResponse | IError = yield call(() => axios.post('mcs/get-all').then(res => res.data));
    if(!(data as IError).errors) {
      yield put(McsActions.getMcsSuccess(data as IMcsResponse));
    } else {
      yield put(McsActions.getMcsFailed(data as IError));
    }
  } catch(err) {
    yield put(McsActions.getMcsFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

export function* mcsSaga() {
  yield takeLatest<TGetMcsAction>(GET_MCS, getMcs);
}