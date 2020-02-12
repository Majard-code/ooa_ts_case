import React from 'react';
import styled from 'styled-components';
import { WrappedFieldProps } from 'redux-form';
import Errors from './Errors';

interface IStyledInput {
  errored: boolean,
}

const StyledInput = styled.div<IStyledInput>`
width: 100%;
input {
  width: 100%;
  line-height: 40px;
  border: 1px solid ${props => props.errored ? 'red' : 'rgb(220, 220, 220)'};
  padding-left: 10px;  
  border-radius: 5px;
}
`;

// 77 video 25:00
const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
  const errored: boolean = meta.touched && meta.error;
  return (
    <StyledInput errored={errored} >
      <input {...input} {...props} spellCheck="false" />
      {errored && <Errors>{meta.error}</Errors>}
    </StyledInput>
  );
}

export default Input;
