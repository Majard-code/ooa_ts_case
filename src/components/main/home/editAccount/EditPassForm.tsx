import React from 'react';
import styled from 'styled-components';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, minLength, password, passwordsMustMatch } from '../../../../utils/validators';
import Input from '../../../uiComponents/Input';
import Button from '../../../uiComponents/Button';
import { RequestStatus } from '../../../../utils/enums';
import Preloader from '../../../preloader/preloader';
import EditAccountErrors from './EditAccountErrors';
import { fadeInDown } from '../../../../animations/Keyframes';
import { Action } from '../../../../store/action-helper';

const minPassword = minLength(6, 'Пароль');

const StyledEditPassForm = styled.form`
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

const EditPassForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = (props) => {
  return (
    <StyledEditPassForm onSubmit={props.handleSubmit}>
      <h2>Изменение пароля</h2>
      <Field name='oldPassword' component={Input} type='password' validate={[required, minPassword, password]} placeholder='Текущий пароль' autoComplete='off' />
      <Field name='password' component={Input} type='password' validate={[required, minPassword, password]} placeholder='Новый пароль' autoComplete='off' />
      <Field name='passConfirm' component={Input} type='password' validate={[required, minPassword, password, passwordsMustMatch]} placeholder='Повтор нового пароля' autoComplete='off' />
      {props.editAccountStatus === RequestStatus.Request ?
        <Preloader size={42} /> :
        <Button>Изменить</Button>
      }
      <EditAccountErrors editAccountErrors={props.editAccountErrors} />
      {props.editAccountStatus === RequestStatus.Request ?
        <p className='off'>Отмена</p> :
        <p className='on' onClick={() => props.clearAccountEdit()}>Отмена</p>
      }
    </StyledEditPassForm>
  );
}

export default reduxForm<{}, IProps>({ form: 'changePassword' })(EditPassForm);