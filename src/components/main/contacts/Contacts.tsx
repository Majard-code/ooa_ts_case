import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../../store/reducers';
import { UserStatus, RequestStatus, ContactsEdit } from '../../../utils/enums';
import { Redirect } from 'react-router-dom';
import PreloaderPage from '../../preloader/preloaderPage/preloaderPage';
import VertSpacer from '../../commons/VertSpacer';
import HorizontalSpacer from '../../commons/HorizontalSpacer';
import EditContacts from './editContacts/EditContacts';
import StringButton from '../../uiComponents/StringButton';
import { ContactsActions } from '../../../store/contacts/contactsActions';
import Errors from '../../uiComponents/Errors';
import { ContactsEditActions } from '../../../store/contactsEdit/contactsEditActions';
import { beautifulPhone } from '../../../utils/utils';

const StyledContacts = styled.section`
display: grid;
gap: 10px;
align-items: center;
grid-template-columns: 1fr max-content max-content;
width: 100%;
height: max-content;
`;

const StyledName = styled.p`
grid-column: 1 / -1;
`;

const StyledValue = styled.p`
text-align: right;
font-weight: 700;
`;

const Contacts: React.FC<TPropsFromRedux> = (props) => {

  const getContacts = props.getContacts;
  const getContactsStart = props.getContactsStart;

  useEffect(() => {
    getContacts();
    return (() => { getContactsStart() })
  }, [getContacts, getContactsStart])

  switch (props.userStatus) {
    case UserStatus.Unauthorized:
      return (
        <Redirect to='/login' />
      )
    case UserStatus.Request:
      return (
        <PreloaderPage />
      )
    case UserStatus.AuthorizedUser:
      return (
        <Redirect to='/' />
      )
    case UserStatus.AuthorizedAdmin:
      switch (props.getContactsStatus) {
        case RequestStatus.Default:
        case RequestStatus.Request:
          return (
            <PreloaderPage />
          )
        case RequestStatus.Failed:
          return (
            <Errors>ОШИБКА СЕРВЕРА. ПЕРЕЗАГРУЗИТЕ СТРАНИЦУ. ОБРАТИТЕСЬ К АДМИНИСТРАТОРУ.</Errors>
          )
        case RequestStatus.Success:
          if (props.contactsEdit === null) {
            return (
              <StyledContacts>
                <h1>Контакты</h1>
                <StyledName>Телефон:</StyledName>
                <StyledValue>{props.contacts && beautifulPhone(props.contacts.phone)}</StyledValue>
                <VertSpacer margin={5} color={'lightgrey'} />
                <StringButton onClick={() => props.changeContactsEdit(ContactsEdit.Phone)}>Изменить</StringButton>
                <HorizontalSpacer margin={5} color={'lightgrey'} />
                <StyledName>Адрес:</StyledName>
                <StyledValue>{props.contacts && props.contacts.address}</StyledValue>
                <VertSpacer margin={5} color={'lightgrey'} />
                <StringButton className='btn' onClick={() => props.changeContactsEdit(ContactsEdit.Address)}>Изменить</StringButton>
                <HorizontalSpacer margin={5} color={'lightgrey'} />
                <StyledName>Координаты:</StyledName>
                <StyledValue>{props.contacts && `${props.contacts.lat}, ${props.contacts.lon}`}</StyledValue>
                <VertSpacer margin={5} color={'lightgrey'} />
                <StringButton onClick={() => props.changeContactsEdit(ContactsEdit.Coordinates)}>Изменить</StringButton>
                <HorizontalSpacer margin={5} color={'lightgrey'} />
              </StyledContacts>
            )
          } else {
            return (
              <EditContacts contactsEdit={props.contactsEdit} />
            )
          }
      }
  }
}

const connector = connect((state: IAppState) => ({
  userStatus: state.auth.userStatus,
  getContactsStatus: state.contacts.getContactsStatus,
  contactsEdit: state.contactsEdit.contactsEdit,
  contacts: state.contacts.contacts,
}), {
  getContacts: ContactsActions.getContacts,
  getContactsStart: ContactsActions.getContactsStart,
  changeContactsEdit: ContactsEditActions.changeContactsEdit,
});
type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Contacts);
