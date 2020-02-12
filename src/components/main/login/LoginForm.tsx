import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, email, password, minLength } from '../../../utils/validators';
import Input from '../../uiComponents/Input';
import Button from '../../uiComponents/Button';
import { UserStatus } from '../../../utils/enums';
import Preloader from '../../preloader/preloader';
import LoginErrors from './LoginErrors';
import { NavLink } from 'react-router-dom';
import Form from '../../uiComponents/Form';

const minPassword = minLength(6, 'Пароль');

interface IProps {
  userStatus: UserStatus,
  loginErrors: string[] | null,
}

const LoginForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = (props) => {
  return (
    <Form as='form' onSubmit={props.handleSubmit}>
      <h2>Вход</h2>
      <Field name='email' component={Input} type='text' validate={[required, email]} placeholder='Почта' />
      <Field name='password' component={Input} type='password' validate={[required, minPassword, password]} placeholder='Пароль' autoComplete='off' />
      {props.userStatus === UserStatus.Request ? <Preloader size={42} /> : <Button>Войти</Button>}
      <LoginErrors loginErrors={props.loginErrors}/>
      <NavLink to='/registration'>Зарегистрироваться</NavLink>
      <NavLink to='/forget'>Забыли пароль?</NavLink>
    </Form>
  );
}

export default reduxForm<{}, IProps>({ form: 'login' })(LoginForm);