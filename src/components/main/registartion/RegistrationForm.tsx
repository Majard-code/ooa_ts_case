import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, email, password, alphaNumeric, passwordsMustMatch, minLength } from '../../../utils/validators';
import Input from '../../uiComponents/Input';
import Button from '../../uiComponents/Button';
import { RequestStatus } from '../../../utils/enums';
import Preloader from '../../preloader/preloader';
import RegErrors from './RegErrors';
import { NavLink } from 'react-router-dom';
import Form from '../../uiComponents/Form';

const minName = minLength(2, 'Имя');
const minPassword = minLength(6, 'Пароль');

interface IProps {
  regStatus: RequestStatus,
  regErrors: string[] | null,
}

const RegistrationForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = (props) => {  
  return (
    <Form as='form' onSubmit={props.handleSubmit}>
      <h2>Регистрация</h2>
      <Field name='name' component={Input} type='text' validate={[required, alphaNumeric, minName]} placeholder='Имя' />
      <Field name='email' component={Input} type='text' validate={[required, email]} placeholder='Почта' />
      <Field name='password' component={Input} type='password' validate={[required, minPassword, password]} placeholder='Пароль' autoComplete='off' />
      <Field name='passconfirm' component={Input} type='password' validate={[required, minPassword, password, passwordsMustMatch]} placeholder='Повтор пароля' autoComplete='off' />
      {props.regStatus !== RequestStatus.Request && <Button>Зарегистрироваться</Button>}
      {props.regStatus === RequestStatus.Request && <Preloader size={42} />}
      <RegErrors regErrors={props.regErrors}/>
      <NavLink to='/login'>Войти</NavLink>
    </Form>
  );
}

export default reduxForm<{}, IProps>({ form: 'registration' })(RegistrationForm);