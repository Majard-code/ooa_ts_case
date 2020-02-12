import React from 'react';
import styled from 'styled-components';
import MenuBtn from './MenuBtn';
import Logo from './Logo';
import Name from './Name';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../../store/reducers';

const StyledHeader = styled.header`
position: relative;
display: grid;
grid-template-columns: max-content max-content 1fr;
align-items: center;
justify-items: right;
width: 100%;
height: max-content;
padding: 10px 20px;
background-color: black;
box-shadow: 0 0 3px 0 black;
z-index: 400;
`;

const Header: React.FC<TPropsFromRedux> = props => {
  return (
    <StyledHeader>
      <Logo />
      <MenuBtn />
      {props.name ? <Name name={props.name} /> : <div></div>}
    </StyledHeader>
  );
}

const connector = connect((state: IAppState) => ({
  name: state.auth.name,
}));

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
