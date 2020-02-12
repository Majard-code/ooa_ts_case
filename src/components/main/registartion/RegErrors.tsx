import React from 'react';
import styled from 'styled-components';

const StyledRegErrors = styled.section`
text-align: center;
font-weight: 700;
color: red;
`;

interface IProps {
  regErrors: string[] | null,
}

const RegErrors: React.FC<IProps> = props => {
  return (
    <StyledRegErrors>
      {props.regErrors && props.regErrors.map((error: string, id: number) => <div key={id}>{error}</div>)}
    </StyledRegErrors>
  );
}

export default RegErrors;
