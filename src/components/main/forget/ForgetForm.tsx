import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, email } from '../../../utils/validators';
import Input from '../../uiComponents/Input';
import Button from '../../uiComponents/Button';
import { RequestStatus } from '../../../utils/enums';
import Preloader from '../../preloader/preloader';
import { NavLink } from 'react-router-dom';
import Form from '../../uiComponents/Form';
import Errors from '../../uiComponents/Errors';

interface IProps {
  forgetStatus: RequestStatus,
  forgetErrors: string[] | null,
}

const ForgetForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = (props) => {
  return (
    <Form as='form' onSubmit={props.handleSubmit}>
      <h2>Сброс пароля</h2>
      <Field name='email' component={Input} type='text' validate={[required, email]} placeholder='Почта' />
      {props.forgetStatus !== RequestStatus.Request && <Button>Сбросить</Button>}
      {props.forgetStatus === RequestStatus.Request && <Preloader size={42} />}
      <Errors>
        {props.forgetErrors && props.forgetErrors.map((error: string, id: number) => <div key={id}>{error}</div>)}
      </Errors>
      <NavLink to='/login'>Назад</NavLink>
    </Form>
  );
}

export default reduxForm<{}, IProps>({ form: 'registration' })(ForgetForm);