import React from 'react';
import styled from 'styled-components';

const StyledLoginErrors = styled.section`
text-align: center;
font-weight: 700;
color: red;
`;

interface IProps {
  loginErrors: string[] | null | undefined,
}

const LoginErrors: React.FC<IProps> = props => {
  return (
    <StyledLoginErrors>
      {props.loginErrors && props.loginErrors.map((error: string, id: number) => <div key={id}>{error}</div>)}
    </StyledLoginErrors>
  );
}

export default LoginErrors;
