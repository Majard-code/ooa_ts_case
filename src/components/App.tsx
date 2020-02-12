import React, { useEffect } from 'react';
import styled from 'styled-components';
import MainHeader from './header/MainHeader';
import Main from './main/Main';
import { ConnectedProps, connect } from 'react-redux';
import { IAppState } from '../store/reducers';
import { AuthActions } from '../store/auth/authActions';

const StyledApp = styled.div`
position: relative;
display: grid;
grid-template-rows: max-content 1fr;
max-width: 1024px;
min-height: 100vh;
margin: 0 auto;
background-color: rgb(240, 240, 240);
z-index: 100;
`;

const App: React.FC<TPropsFromRedux> = props => {
  const { checkUser } = props;
  useEffect(() => { checkUser() }, [checkUser]);
  return (
    <StyledApp>
      <MainHeader />
      <Main />
    </StyledApp>
  );
}

const connector = connect((state: IAppState) => ({
  userStatus: state.auth.userStatus,
}), {
  checkUser: AuthActions.checkUser,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
