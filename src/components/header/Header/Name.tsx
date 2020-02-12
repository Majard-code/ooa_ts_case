import React from 'react';
import styled from 'styled-components';
import VertSpacer from '../../commons/VertSpacer';
import LogoutBtn from './LogoutBtn';
import { NavLink } from 'react-router-dom';

const StyledName = styled.div`
display: flexbox;
text-align: right;
color: white;
font-family: 'Roboto-Medium', Verdana, Arial, Helvetica, sans-serif;
a {  
  line-height: 25px;
  font-weight: 700;
}
`;

interface IProps {
  name: string | null,
}

const Name: React.FC<IProps> = props => {
  return (
    <StyledName>
      <NavLink to='/'>{props.name}</NavLink>
      <VertSpacer margin={20} color={'white'}/>
      <LogoutBtn />
    </StyledName>
  );
}

export default Name;
