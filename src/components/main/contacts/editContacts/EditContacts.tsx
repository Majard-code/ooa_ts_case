import React from 'react';
import styled from 'styled-components';
import { RequestStatus, ContactsEdit } from '../../../../utils/enums';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../../../store/reducers';
import EditContactsSuccess from './EditContactsSuccess';
import EditAddressForm from './EditAddressForm';
import { ContactsEditActions } from '../../../../store/contactsEdit/contactsEditActions';
import EditPhoneForm from './EditPhoneForm';
import EditCoordinatesForm from './EditCoordinatesForm';
import { toFormData } from '../../../../utils/utils';

const StyledRegistration = styled.section`
display: grid;
align-items: center;
justify-items: center;
width: 100%;
height: 100%;
`;

interface IProps {
  contactsEdit: ContactsEdit,
}

const EditContacts: React.FC<IProps & TPropsFromRedux> = props => {
  switch (props.contactsEdit) {
    case ContactsEdit.Phone:
      return (
        <StyledRegistration>
          {props.contactsEditStatus === RequestStatus.Success ?
            <EditContactsSuccess /> :
            <EditPhoneForm 
              contactsEditErrors={props.contactsEditErrors}
              clearContactsEdit={props.clearContactsEdit}
              contactsEditStatus={props.contactsEditStatus}
              onSubmit={(formData: any) => props.changePhone(toFormData(formData))}
            />
          }
        </StyledRegistration>
      )
    case ContactsEdit.Address:
      return (
        <StyledRegistration>
          {props.contactsEditStatus === RequestStatus.Success ?
            <EditContactsSuccess /> :
            <EditAddressForm
              initialValues={{address: props.contacts && props.contacts.address}}
              contactsEditErrors={props.contactsEditErrors}
              clearContactsEdit={props.clearContactsEdit}
              contactsEditStatus={props.contactsEditStatus}
              onSubmit={(formData: any) => props.changeAddress(toFormData(formData))}
            />
          }
        </StyledRegistration>
      )
    case ContactsEdit.Coordinates:
      return (
        <StyledRegistration>
          {props.contactsEditStatus === RequestStatus.Success ?
            <EditContactsSuccess /> :
            <EditCoordinatesForm contactsEditErrors={props.contactsEditErrors}
              clearContactsEdit={props.clearContactsEdit}
              contactsEditStatus={props.contactsEditStatus}
              onSubmit={(formData: any) => props.changeCoordinates(toFormData(formData))}
            />
          }
        </StyledRegistration>
      )
  }
}

const connector = connect(((state: IAppState) => ({
  contactsEditStatus: state.contactsEdit.contactsEditStatus,
  contactsEditErrors: state.contactsEdit.errors,
  contacts: state.contacts.contacts,
})), {
  clearContactsEdit: ContactsEditActions.clearContactsEdit,
  changePhone: ContactsEditActions.contactsEditPhone,
  changeAddress: ContactsEditActions.contactsEditAddress,
  changeCoordinates: ContactsEditActions.contactsEditCoordinates,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EditContacts);
