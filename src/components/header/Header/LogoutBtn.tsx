import React from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { AuthActions } from '../../../store/auth/authActions';

const StyledLogoutBtn = styled.div`
cursor: pointer;
font-family: 'Roboto-medium', Verdana, Arial, Helvetica, sans-serif;
color: white;
line-height: 25px;
`;

const LogoutBtn: React.FC<TPropsFromRedux> = props => {
  return (
    <StyledLogoutBtn onClick={props.logoutUser}>Выйти</StyledLogoutBtn>
  );
}

const connector = connect(null, {
  logoutUser: AuthActions.logoutUser,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LogoutBtn);
