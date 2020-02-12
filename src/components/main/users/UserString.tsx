import React from 'react';
import styled from 'styled-components';
import { IUser } from '../../../store/users/usersActions';
import HorizontalSpacer from '../../commons/HorizontalSpacer';
import VertSpacer from '../../commons/VertSpacer';
import { ConfirmForms } from '../../../utils/enums';
import { ActionWithPayload } from '../../../store/action-helper';

const StyledUserString = styled.section`
display: grid;
grid-template-columns: max-content 1fr max-content max-content;
grid-template-rows: max-content max-content max-content;
grid-template-areas:
"name btn1 vertSpacer btn2"
"email btn1 vertSpacer btn2"
"spacer spacer spacer spacer";
`;

const StyledUserStringName = styled.div`
grid-area: name;
font-weight: 700;
`;

const StyledUserStringMail = styled.div`
grid-area: email;
`;

const StyledUserStringBtn1 = styled.div`
cursor: pointer;
grid-area: btn1;
align-self: center;
justify-self: right;
`;

const StyledUserStringBtn2 = styled.div`
cursor: pointer;
grid-area: btn2;
align-self: center;
justify-self: right;
`;

const StyledUserStringSpacer = styled(HorizontalSpacer)`
grid-area: spacer;
`;

const StyledUserStringVertSpacer = styled(VertSpacer)`
grid-area: vertSpacer;
`;


interface IProps {
  user: IUser,
  openConfirmForm: (payload: {
    confirmForm: ConfirmForms;
    userForEdit: IUser;
}) => ActionWithPayload<"OPEN_CONFIRM_FORM", {
    confirmForm: ConfirmForms;
    userForEdit: IUser;
}>
}

const UserString: React.FC<IProps> = props => {
  return (
    <StyledUserString>
      <StyledUserStringName>{props.user.name}</StyledUserStringName>
      <StyledUserStringMail>{props.user.email}</StyledUserStringMail>
      <StyledUserStringBtn1 onClick={() => props.openConfirmForm({ confirmForm: ConfirmForms.UserToAdmin, userForEdit: props.user })} >Админ</StyledUserStringBtn1>
      <StyledUserStringVertSpacer margin={15} color={'lightgray'} />
      <StyledUserStringBtn2 onClick={() => props.openConfirmForm({ confirmForm: ConfirmForms.DeleteUser, userForEdit: props.user })} >Удалить</StyledUserStringBtn2>
      <StyledUserStringSpacer margin={15} color={'lightgray'}/>
    </StyledUserString>
  );
}

export default UserString;
