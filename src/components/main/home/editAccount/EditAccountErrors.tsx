import React from 'react';
import styled from 'styled-components';

const StyledEditAccountErrors = styled.section`
text-align: center;
font-weight: 700;
color: red;
`;

interface IProps {
  editAccountErrors: string[] | null,
}

const EditAccountErrors: React.FC<IProps> = props => {
  return (
    <StyledEditAccountErrors>
      {props.editAccountErrors && props.editAccountErrors.map((error: string, id: number) => <div key={id}>{error}</div>)}
    </StyledEditAccountErrors>
  );
}

export default EditAccountErrors;
