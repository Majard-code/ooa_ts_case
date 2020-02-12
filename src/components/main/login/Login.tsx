import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import LoginForm from './LoginForm';
import { IAppState } from '../../../store/reducers';
import { UserStatus } from '../../../utils/enums';
import { AuthActions } from '../../../store/auth/authActions';
import { Redirect } from 'react-router-dom';
import { toFormData } from '../../../utils/utils';

const StyledLogin = styled.section`
display: grid;
align-items: center;
justify-items: center;
width: 100%;
height: 100%;
`;

const Login: React.FC<TPropsFromRedux> = props => {

  const { clearUserErrors } = props;

  useEffect(() => {
    return () => {
      clearUserErrors();
    }
  }, [clearUserErrors]);

  switch(props.userStatus) {
    case UserStatus.Unauthorized:
    case UserStatus.Request:
      return (
        <StyledLogin>
          <LoginForm loginErrors={props.loginErrors} userStatus={props.userStatus} onSubmit={(formData: any) => props.loginUser(toFormData(formData))}/>
        </StyledLogin>
      )
    case UserStatus.AuthorizedUser:
    case UserStatus.AuthorizedAdmin:
      return (
        <Redirect to='/' />
      )
  }
}

const connector = connect(((state: IAppState) => ({  
  userStatus: state.auth.userStatus,
  loginErrors: state.auth.errors,
})), {
  loginUser: AuthActions.loginUser,
  clearUserErrors: AuthActions.clearUserErrors,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Login);
