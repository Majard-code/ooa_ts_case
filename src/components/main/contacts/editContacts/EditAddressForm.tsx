import React from 'react';
import styled from 'styled-components';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, address } from '../../../../utils/validators';
import Button from '../../../uiComponents/Button';
import { RequestStatus } from '../../../../utils/enums';
import Preloader from '../../../preloader/preloader';
import { fadeInDown } from '../../../../animations/Keyframes';
import { Action } from '../../../../store/action-helper';
import TextArea from '../../../uiComponents/TextArea';
import Errors from '../../../uiComponents/Errors';

const StyledEditAddressForm = styled.form`
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

const EditAddressForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = (props) => {
  return (
    <StyledEditAddressForm onSubmit={props.handleSubmit}>
      <h2>Изменение адреса</h2>
      <Field name='address' component={TextArea} type='text' validate={[required, address]} placeholder='Новый адрес' />
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
    </StyledEditAddressForm>
  );
}

export default reduxForm<{}, IProps>({ form: 'changeAddress' })(EditAddressForm);