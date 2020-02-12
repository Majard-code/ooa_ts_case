import { takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { IMcsResponse, McsEditActions, UPLOAD_MCS } from './mcsEditActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { IError } from '../../utils/types';

type TUploadMcsAction = ReturnType<typeof McsEditActions.uploadMcs>

function* uploadMcs({ payload }: { payload: FormData }) {
  yield put(McsEditActions.uploadMcsStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IMcsResponse | IError = yield call(() => axios.post('mcs/create-mc', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if (!(data as IError).errors) {
      yield put(McsEditActions.uploadMcsSuccess(data as IMcsResponse));
    } else {
      yield put(McsEditActions.uploadMcsFailed(data as IError));
    }
  } catch (err) {
    yield put(McsEditActions.uploadMcsFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

export function* mcsEditSaga() {
  yield takeLatest<TUploadMcsAction>(UPLOAD_MCS, uploadMcs);
}