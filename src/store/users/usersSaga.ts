import { takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { UsersActions, GET_ALL_USERS, IUsersResponse, EDIT_USER_USER_TO_ADMIN, EDIT_USER_ADMIN_TO_USER, EDIT_USER_DELETE_USER } from './usersActions';
import { PRELOADER_DELAY } from '../../utils/constants';
import { IResponse, IError } from '../../utils/types';

type TGetAllUsersAction = ReturnType<typeof UsersActions.getAllUsers>
type TAdminToUserAction = ReturnType<typeof UsersActions.editUserAdminToUser>
type TUserToAdminAction = ReturnType<typeof UsersActions.editUserUserToAdmin>
type TDeleteUserAction = ReturnType<typeof UsersActions.editUserDeleteUser>

function* getAllUsers() {
  yield put(UsersActions.getAllUsersStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IUsersResponse | IError = yield call(() => axios.get('users/get-all-users').then(res => res.data));
    if(!(data as IError).errors) {
      yield put(UsersActions.getAllUsersSuccess(data as IUsersResponse));
    } else {
      yield put(UsersActions.getAllUsersFailed(data as IError));
    }
  } catch(err) {
    yield put(UsersActions.getAllUsersFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

function* editUserAdminToUser({ payload }: { payload: FormData }) {
  yield put(UsersActions.editUserStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('users/edit-admin-to-user', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(UsersActions.editUserSuccess(data as IResponse));
      yield put(UsersActions.getAllUsers());
    } else {
      yield put(UsersActions.editUserFailed(data as IError));
    }
  } catch(err) {
    yield put(UsersActions.editUserFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

function* editUserUserToAdmin({ payload }: { payload: FormData }) {
  yield put(UsersActions.editUserStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('users/edit-user-to-admin', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(UsersActions.editUserSuccess(data as IResponse));
      yield put(UsersActions.getAllUsers());
    } else {
      yield put(UsersActions.editUserFailed(data as IError));
    }
  } catch(err) {
    yield put(UsersActions.editUserFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

function* editDeleteUser({ payload }: { payload: FormData }) {
  yield put(UsersActions.editUserStart());
  yield delay(PRELOADER_DELAY);
  try {
    const data: IResponse | IError = yield call(() => axios.post('users/edit-delete-user', payload, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data));
    if(!(data as IError).errors) {
      yield put(UsersActions.editUserSuccess(data as IResponse));
      yield put(UsersActions.getAllUsers());
    } else {
      yield put(UsersActions.editUserFailed(data as IError));
    }
  } catch(err) {
    yield put(UsersActions.editUserFailed({ 'errors': ['Ошибка сервера. Проверьте соединение с интернетом. Перезагрузите приложение.'] }));
  }
}

export function* usersSaga() {
  yield takeLatest<TGetAllUsersAction>(GET_ALL_USERS, getAllUsers);
  yield takeLatest<TAdminToUserAction>(EDIT_USER_ADMIN_TO_USER, editUserAdminToUser);
  yield takeLatest<TUserToAdminAction>(EDIT_USER_USER_TO_ADMIN, editUserUserToAdmin);
  yield takeLatest<TDeleteUserAction>(EDIT_USER_DELETE_USER, editDeleteUser);
}