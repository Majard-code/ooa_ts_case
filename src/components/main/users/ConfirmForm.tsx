import React from 'react';
import styled from 'styled-components';
import { UsersActions } from '../../../store/users/usersActions';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../../store/reducers';
import { ConfirmForms, RequestStatus } from '../../../utils/enums';
import Button from '../../uiComponents/Button';
import Form from '../../uiComponents/Form';
import Preloader from '../../preloader/preloader';
import Errors from '../../uiComponents/Errors';
import { toFormData } from '../../../utils/utils';

const StyledConfirmFormUserName = styled.p`
font-weight: 700;
`;

const StyledConfirmFormBtns = styled.div`
display: flex;
`;
const StyledConfirmFormSpacer = styled.div`
width: 15px;
`;

const ConfirmForm: React.FC<TPropsFromRedux> = props => {
  return (
    <Form>
      <h2>Подтверждение</h2>
      <p>Пользователь:</p>
      <StyledConfirmFormUserName>{props.userForEdit && props.userForEdit.name}</StyledConfirmFormUserName>
      <p>({props.userForEdit && props.userForEdit.email})</p>
      {props.confirmForm === ConfirmForms.AdminToUser && <p>будет удален из администраторов.</p>}
      {props.confirmForm === ConfirmForms.UserToAdmin && <p>будет добавлен в администраторы.</p>}
      {props.confirmForm === ConfirmForms.DeleteUser && <p>будет удален.</p>}
      {props.editUserStatus === RequestStatus.Request ?
        <Preloader size={42} /> :
        <StyledConfirmFormBtns>
          {props.confirmForm === ConfirmForms.AdminToUser && <Button onClick={() => { if (props.userForEdit) props.editUserAdminToUser(toFormData({ email: props.userForEdit.email })) }}>Да</Button>}
          {props.confirmForm === ConfirmForms.UserToAdmin && <Button onClick={() => { if (props.userForEdit) props.editUserUserToAdmin(toFormData({ email: props.userForEdit.email })) }}>Да</Button>}
          {props.confirmForm === ConfirmForms.DeleteUser && <Button onClick={() => { if (props.userForEdit) props.editUserDeleteUser(toFormData({ email: props.userForEdit.email })) }}>Да</Button>}
          <StyledConfirmFormSpacer />
          <Button onClick={() => props.clearConfirmForm()}>Нет</Button>
        </StyledConfirmFormBtns>}
      <Errors>
        {props.editingErrors && props.editingErrors.map((error: string, id: number) => <div key={id}>{error}</div>)}
      </Errors>
    </Form>
  );
}

const connector = connect((state: IAppState) => ({
  userForEdit: state.users.userForEdit,
  confirmForm: state.users.confirmForm,
  editUserStatus: state.users.editUserStatus,
  editingErrors: state.users.editingErrors,
}), {
  clearConfirmForm: UsersActions.clearConfirmForm,
  editUserAdminToUser: UsersActions.editUserAdminToUser,
  editUserUserToAdmin: UsersActions.editUserUserToAdmin,
  editUserDeleteUser: UsersActions.editUserDeleteUser,
});
type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ConfirmForm);
