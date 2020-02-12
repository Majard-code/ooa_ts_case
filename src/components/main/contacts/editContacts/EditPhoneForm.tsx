import React from 'react';
import styled from 'styled-components';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { phone, required } from '../../../../utils/validators';
import Input from '../../../uiComponents/Input';
import Button from '../../../uiComponents/Button';
import { RequestStatus } from '../../../../utils/enums';
import Preloader from '../../../preloader/preloader';
import { fadeInDown } from '../../../../animations/Keyframes';
import { Action } from '../../../../store/action-helper';
import Errors from '../../../uiComponents/Errors';

const StyledEditPhoneForm = styled.form`
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
  contactsEditStatus: RequestStatus,
  contactsEditErrors: string[] | null,
  clearContactsEdit: () => Action<"CLEAR_CONTACTS_EDIT">
}

const EditPhoneForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = (props) => {
  return (
    <StyledEditPhoneForm onSubmit={props.handleSubmit}>
      <h2>Изменение телефона</h2>
      <Field name='phone' component={Input} type='text' validate={[required, phone]} placeholder='10 цифр нового телефона' />
      {props.contactsEditStatus === RequestStatus.Request ?
        <Preloader size={42} /> :
        <Button>Изменить</Button>
      }
      <div>
        {props.contactsEditErrors && props.contactsEditErrors.map((error: string, id: number) => <Errors key={id}>{error}</Errors>)}
      </div>
      {props.contactsEditStatus === RequestStatus.Request ?
        <p className='off'>Отмена</p> :
        <p className='on' onClick={() => props.clearContactsEdit()}>Отмена</p>
      }
    </StyledEditPhoneForm>
  );
}

export default reduxForm<{}, IProps>({ form: 'changePhone' })(EditPhoneForm);