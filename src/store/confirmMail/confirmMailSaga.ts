import { takeLatest, delay, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { ConfirmMailActions, CONFIRM_MAIL } from './confirmMailActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { IResponse, IError } from '../../utils/types';

type TConfirmMailAction = ReturnType<typeof ConfirmMailActions.confirmMail>

function* confirmMail({ payload }: { payload: FormData }) {
  yield put(ConfirmMailActions.confirmMailStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('users/confirm-mail', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(ConfirmMailActions.confirmMailSuccess(data as IResponse));
    } else {
      yield put(ConfirmMailActions.confirmMailFailed(data as IError));
    }
  } catch(err) {
      yield put(ConfirmMailActions.confirmMailFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

export function* confirmMailSaga() {
  yield takeLatest<TConfirmMailAction>(CONFIRM_MAIL, confirmMail);
}