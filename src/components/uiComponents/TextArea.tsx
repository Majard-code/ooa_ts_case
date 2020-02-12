import React from 'react';
import styled from 'styled-components';
import { WrappedFieldProps } from 'redux-form';
import Errors from './Errors';

interface IStyledTextArea {
  errored: boolean,
}

const StyledTextArea = styled.div<IStyledTextArea>`
width: 100%;
textarea {
  width: 100%;
  line-height: 40px;
  height: 140px;
  border: 1px solid ${props => props.errored ? 'red' : 'rgb(220, 220, 220)'};
  padding-left: 10px;  
  border-radius: 5px;
  resize: none;
}
`;

// 77 video 25:00
const TextArea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
  const errored: boolean = meta.touched && meta.error;
  return (
    <StyledTextArea errored={errored} >
      <textarea {...input} {...props} spellCheck="false" />
      {errored && <Errors>{meta.error}</Errors>}
    </StyledTextArea>
  );
}

export default TextArea;
