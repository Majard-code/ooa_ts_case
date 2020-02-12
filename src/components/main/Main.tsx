import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Registration from './registartion/Registration';
import Home from './home/Home';
import Login from './login/Login';
import Confirmation from './confirmation/Confirmation';
import Users from './users/Users';
import Forget from './forget/Forget';
import Contacts from './contacts/Contacts';
import Mcs from './mcs/Mcs';

const StyledMain = styled.main`
width: 100%;
height: 100%;
padding: 20px;
`;

const Main: React.FC = () => {
  return (
    <StyledMain>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/registration' component={Registration} />
        <Route path='/confirmation/:token?' component={Confirmation} />
        <Route path='/users' component={Users} />
        <Route path='/forget' component={Forget} />
        <Route path='/contacts' component={Contacts} />
        <Route path='/mcs' component={Mcs} />
        <Route path='/' component={Home} />
      </Switch>
    </StyledMain>
  );
}

export default Main;
