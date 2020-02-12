import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledLogo = styled.img`
cursor: pointer;
width: 36x;
height: 36px;
margin: 7px 7px 7px 0;
`;

const Logo: React.FC = () => {
  const history = useHistory();
  return (
    <StyledLogo src={require('./imgs/logo.svg')} onClick={() => history.push('/')} alt='Логотип'>
    </StyledLogo>
  );
}

export default Logo;
