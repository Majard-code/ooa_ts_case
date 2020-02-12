import React from 'react';
import styled from 'styled-components';

interface IProps {
  accessValue: 'user' | 'admin',
}

const StyledAccessName = styled.div<IProps>`
font-weight: 700;
color: ${props => props.accessValue === 'admin' ? 'green' : 'red'};
`;

const AccessName: React.FC<IProps> = props => {
  return (
    <StyledAccessName accessValue={props.accessValue}>{props.accessValue === 'admin' ? 'Администратор' : 'Пользователь'}</StyledAccessName>
  );
}

export default AccessName;
