import React from 'react';
import styled from 'styled-components';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, alphaNumeric, minLength } from '../../../../utils/validators';
import Input from '../../../uiComponents/Input';
import Button from '../../../uiComponents/Button';
import { RequestStatus } from '../../../../utils/enums';
import Preloader from '../../../preloader/preloader';
import EditAccountErrors from './EditAccountErrors';
import { fadeInDown } from '../../../../animations/Keyframes';
import { Action } from '../../../../store/action-helper';

const minName = minLength(2, 'Имя');

const StyledEditNameForm = styled.form`
display: grid;
gap: 15px;
justify-items: center;
width: 320px;
height: max-content;
padding: 20px;
box-shadow: 0 0 10px 5px rgb(220, 220, 220);
background-color: rgb(245, 245, 245);
animation: ${fadeInDown} 500ms ease-out both;
p {
  color: black;
  font-weight: 700;
}
.on {
  cursor: pointer;
}
.off {
  color: lightgray;
}
`;

interface IProps {
  editAccountStatus: RequestStatus,
  editAccountErrors: string[] | null,
  clearAccountEdit: () => Action<"CLEAR_ACCOUNT_EDIT">
}

const EditNameForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = (props) => {
  return (
    <StyledEditNameForm onSubmit={props.handleSubmit}>
      <h2>Изменение имени</h2>
      <Field name='name' component={Input} type='text' validate={[required, alphaNumeric, minName]} placeholder='Новое имя' />
      {props.editAccountStatus === RequestStatus.Request ?
        <Preloader size={42} /> :
        <Button>Изменить</Button>
      }
      <EditAccountErrors editAccountErrors={props.editAccountErrors} />
      {props.editAccountStatus === RequestStatus.Request ?
        <p className='off'>Отмена</p> :
        <p className='on' onClick={() => props.clearAccountEdit()}>Отмена</p>
      }
    </StyledEditNameForm>
  );
}

export default reduxForm<{}, IProps>({ form: 'changeName' })(EditNameForm);