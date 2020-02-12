import React from 'react';
import styled from 'styled-components';
import { AccountEdit, RequestStatus } from '../../../../utils/enums';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../../../store/reducers';
import { AccountActions } from '../../../../store/account/accountActions';
import EditAccountSuccess from './EditAccountSuccess';
import EditNameForm from './EditNameForm';
import EditPassForm from './EditPassForm';
import { toFormData } from '../../../../utils/utils';

const StyledRegistration = styled.section`
display: grid;
align-items: center;
justify-items: center;
width: 100%;
height: 100%;
`;

interface IProps {
  accountEdit: AccountEdit,
}

const EditAccount: React.FC<IProps & TPropsFromRedux> = props => {
  switch (props.accountEdit) {
    case AccountEdit.Name:
      return (
        <StyledRegistration>
          {props.editAccountStatus === RequestStatus.Success ?
          <EditAccountSuccess /> :
          <EditNameForm editAccountErrors={props.editAccountErrors}
            clearAccountEdit={props.clearAccountEdit}
            editAccountStatus={props.editAccountStatus}
            onSubmit={(formData: any) => props.changeName(toFormData(formData))}
            />
          }
        </StyledRegistration>
      )
    case AccountEdit.Password:
      return (
        <StyledRegistration>
          {props.editAccountStatus === RequestStatus.Success ?
          <EditAccountSuccess /> :
          <EditPassForm editAccountErrors={props.editAccountErrors}
            clearAccountEdit={props.clearAccountEdit}
            editAccountStatus={props.editAccountStatus}
            onSubmit={(formData: any) => props.changePassword(toFormData(formData))}
            />
          }
        </StyledRegistration>
      )
  }
}

const connector = connect(((state: IAppState) => ({
  editAccountStatus: state.account.accountEditStatus,
  editAccountErrors: state.account.errors,
})), {
  clearAccountEdit: AccountActions.clearAccountEdit,
  changeName: AccountActions.changeName,
  changePassword: AccountActions.changePassword,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EditAccount);
