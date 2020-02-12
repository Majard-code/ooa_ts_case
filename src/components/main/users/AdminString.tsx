import React from 'react';
import styled from 'styled-components';
import { IUser } from '../../../store/users/usersActions';
import HorizontalSpacer from '../../commons/HorizontalSpacer';
import { ConfirmForms } from '../../../utils/enums';
import { ActionWithPayload } from '../../../store/action-helper';


const StyledAdminString = styled.section`
display: grid;
grid-template-columns: max-content 1fr;
grid-template-rows: max-content max-content max-content;
grid-template-areas:
"name btn"
"email btn"
"spacer spacer";
`;

const StyledAdminStringName = styled.div`
grid-area: name;
font-weight: 700;
`;

const StyledAdminStringMail = styled.div`
grid-area: email;
`;

const StyledAdminStringBtn = styled.div`
cursor: pointer;
grid-area: btn;
align-self: center;
justify-self: right;
`;

const StyledAdminStringSpacer = styled(HorizontalSpacer)`
grid-area: spacer;
`;


interface IProps {
  admin: IUser,
  openConfirmForm: (payload: {
    confirmForm: ConfirmForms;
    userForEdit: IUser;
}) => ActionWithPayload<"OPEN_CONFIRM_FORM", {
    confirmForm: ConfirmForms;
    userForEdit: IUser;
}>
}

const AdminString: React.FC<IProps> = props => {
  return (
    <StyledAdminString>
      <StyledAdminStringName>{props.admin.name}</StyledAdminStringName>
      <StyledAdminStringMail>{props.admin.email}</StyledAdminStringMail>
      <StyledAdminStringBtn onClick={() => props.openConfirmForm({ confirmForm: ConfirmForms.AdminToUser, userForEdit: props.admin })}>Удалить</StyledAdminStringBtn>
      <StyledAdminStringSpacer margin={15} color={'lightgray'}/>
    </StyledAdminString>
  );
}

export default AdminString;
