import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import styled from 'styled-components';
import Errors from './Errors';

interface ISFileInput {
  errored: boolean,
}

const SFileInput = styled.div<ISFileInput>`
display: grid;
gap: 20px;
grid-template-rows: ${props => props.errored && 'max-content '}max-content;
width: 100%;
input {
  display: none;
}
label {
  justify-self: center;
  p {
    cursor: pointer;
    width: 250px;
    padding: 0 20px;
    line-height: 40px;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 20px;
    text-align: center;
    background-color: white;
    &:active {
      box-shadow: inset 0px 0px 3px 1px rgb(220, 220, 220);
    }
  }
}
`;

const handleChange: any = (handler: any) => ({ target: { files } }: any) => handler(files.length ? files[0] : null);

const FileInput: React.FC<WrappedFieldProps> = ({ input: { onChange, onBlur, value: omitValue, ...inputProps }, meta, ...props }) => {
  const errored: boolean = meta.touched && meta.error;
  return (
    <SFileInput errored={errored}>
      {errored && <Errors>{meta.error}</Errors>}
      <input id='photo_file' type="file" onChange={handleChange(onChange)} onBlur={handleChange(onBlur)} {...inputProps} {...props} />
      <label htmlFor='photo_file'><p>Загрузить фото</p></label>
    </SFileInput>
  );
}

export default FileInput;