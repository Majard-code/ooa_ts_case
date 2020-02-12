import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ConnectedProps, connect } from 'react-redux';
import { IAppState } from '../../../store/reducers';
import { UserStatus, RequestStatus, ConfirmForms } from '../../../utils/enums';
import { Redirect } from 'react-router-dom';
import PreloaderPage from '../../preloader/preloaderPage/preloaderPage';
import { UsersActions, IUser } from '../../../store/users/usersActions';
import AdminString from './AdminString';
import UserString from './UserString';
import ConfirmForm from './ConfirmForm';
import SuccessForm from './SuccessForm';
import Errors from '../../uiComponents/Errors';
import FormContainer from '../../uiComponents/FormContainer';

const StyledUsers = styled.section`
display: grid;
width: 100%;
height: max-content;
`;


const Users: React.FC<TPropsFromRedux> = props => {
  const getAllUsers = props.getAllUsers;
  const getAllUsersStart = props.getAllUsersStart
  useEffect(() => {
    getAllUsers();
    return (() => { getAllUsersStart() })
  }, [getAllUsers, getAllUsersStart])
  switch (props.userStatus) {
    case UserStatus.Unauthorized:
      return (
        <Redirect to='/login' />
      )
    case UserStatus.Request:
      return (
        <PreloaderPage />
      )
    case UserStatus.AuthorizedUser:
      return (
        <Redirect to='/' />
      )
    case UserStatus.AuthorizedAdmin:
      switch (props.users.usersFetchStatus) {
        case RequestStatus.Default:
        case RequestStatus.Request:
          return (
            <PreloaderPage />
          )
        case RequestStatus.Failed:
          return (
            <Errors>ОШИБКА СЕРВЕРА. ПЕРЕЗАГРУЗИТЕ СТРАНИЦУ. ОБРАТИТЕСЬ К АДМИНИСТРАТОРУ.</Errors>
          )
        case RequestStatus.Success:
          switch (props.users.confirmForm) {
            case ConfirmForms.Off:
              return (
                <StyledUsers>
                  <h1>Администраторы</h1>
                  {props.users.admins && props.users.admins.map((admin: IUser, id: number) => <AdminString key={id} admin={admin} openConfirmForm={props.openConfirmForm} />)}
                  {props.users.users && <h1>Пользователи</h1>}
                  {props.users.users && props.users.users.map((user: IUser, id: number) => <UserString key={id} user={user} openConfirmForm={props.openConfirmForm} />)}
                </StyledUsers>
              )
            case ConfirmForms.AdminToUser:
            case ConfirmForms.UserToAdmin:
            case ConfirmForms.DeleteUser:
              return (
                <FormContainer>
                  <ConfirmForm />
                </FormContainer>
              )
            case ConfirmForms.Success:
              return (
                <FormContainer>
                  <SuccessForm />
                </FormContainer>
              )
          }
      }
  }
}

const connector = connect((state: IAppState) => ({
  userStatus: state.auth.userStatus,
  users: state.users,
}), {
  getAllUsers: UsersActions.getAllUsers,
  getAllUsersStart: UsersActions.getAllUsersStart,
  openConfirmForm: UsersActions.openConfirmForm,
});
type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Users);
