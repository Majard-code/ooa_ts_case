import React from 'react';
import styled from 'styled-components';
import { WrappedFieldProps } from 'redux-form';
import Errors from './Errors';

interface ISDateTimeInput {
  errored: boolean,
}

const SDateTimeInput = styled.div<ISDateTimeInput>`
width: 100%;
input {
  width: 100%;
  border: 1px solid ${props => props.errored ? 'red' : 'rgb(220, 220, 220)'};
  padding-left: 10px;  
  border-radius: 5px;
}
`;

// 77 video 25:00
const DateTimeInput: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
  const errored: boolean = meta.touched && meta.error;
  return (
    <SDateTimeInput errored={errored} >
      <input {...input} {...props} spellCheck="false" />
      {errored && <Errors>{meta.error}</Errors>}
    </SDateTimeInput>
  );
}

export default DateTimeInput;
