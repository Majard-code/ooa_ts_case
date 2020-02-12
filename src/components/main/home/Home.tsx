import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../../store/reducers';
import { UserStatus, AccountEdit } from '../../../utils/enums';
import { Redirect } from 'react-router-dom';
import PreloaderPage from '../../preloader/preloaderPage/preloaderPage';
import VertSpacer from '../../commons/VertSpacer';
import HorizontalSpacer from '../../commons/HorizontalSpacer';
import { AccountActions } from '../../../store/account/accountActions';
import EditAccount from './editAccount/EditAccount';
import StringButton from '../../uiComponents/StringButton';
import AccessName from '../../uiComponents/AccessName';
import { AuthActions } from '../../../store/auth/authActions';

const StyledHome = styled.section`
display: grid;
grid-template-columns: max-content 1fr;
width: 100%;
height: max-content;
div {
  display: flex;
  line-height: 40px
}
.name {
  text-align: right;
}
.value {
  justify-content: flex-end;
  font-weight: 700;
}
.user {
  color: red;
}
.admin {
  color: green;
}
`;

const Home: React.FC<TPropsFromRedux> = (props) => {
  const { checkUser } = props;
  useEffect(() => { 
    checkUser();
  }, [checkUser]);
  switch (props.user.userStatus) {
    case UserStatus.Unauthorized:
      return (
        <Redirect to='/login' />
      )
    case UserStatus.Request:
      return (
        <PreloaderPage />
      )
    case UserStatus.AuthorizedUser:
    case UserStatus.AuthorizedAdmin:
      if (props.accountEdit === null) {
        return (
          <StyledHome>
            <h1>Личный кабинет</h1>
            <div className='name'><p>Почта:</p></div>
            <div className="value">
              <p>{props.user.email}</p>
            </div>
            <HorizontalSpacer margin={10} color={'lightgrey'} />
            <div className='name'><p>Имя:</p></div>
            <div className="value">
              <p>{props.user.name}</p>
              <VertSpacer margin={10} color={'lightgrey'} />
              <StringButton onClick={() => props.changeAccountEdit(AccountEdit.Name)}>Изменить</StringButton>
            </div>
            <HorizontalSpacer margin={10} color={'lightgrey'} />
            <div className='name'><p>Пароль:</p></div>
            <div className="value">
              <p>******</p>
              <VertSpacer margin={10} color={'lightgrey'} />
              <StringButton className='btn' onClick={() => props.changeAccountEdit(AccountEdit.Password)}>Изменить</StringButton>
            </div>
            <HorizontalSpacer margin={10} color={'lightgrey'} />
            <div className='name'><p>Доступ:</p></div>
            <div className="value">
              {props.user.userStatus === UserStatus.AuthorizedUser && <AccessName accessValue='user' />}
              {props.user.userStatus === UserStatus.AuthorizedAdmin && <AccessName accessValue='admin' />}
            </div>
            <HorizontalSpacer margin={10} color={'lightgrey'} />
          </StyledHome>
        )
      } else {
        return (
          <EditAccount accountEdit={props.accountEdit} />
        )
      }
  }
}

const connector = connect((state: IAppState) => ({
  user: state.auth,
  accountEdit: state.account.accountEdit,
}), {
  changeAccountEdit: AccountActions.changeAccountEdit,
  checkUser: AuthActions.checkUser,
  authUserStart: AuthActions.authUserStart,
});
type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);
