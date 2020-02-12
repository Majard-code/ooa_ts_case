import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../uiComponents/Button';
import { IAppState } from '../../../store/reducers';
import Form from '../../uiComponents/Form';
import { UsersActions } from '../../../store/users/usersActions';

const SuccessForm: React.FC<TPropsFromRedux> = (props) => {
  return (
    <Form>
      <div>{props.message}</div>
      <Button onClick={() => props.clearConfirmForm()}>Ok</Button>
    </Form>
  );
}

const connector = connect((state: IAppState) => ({
  message: state.users.editingMessage,
}), {
  clearConfirmForm: UsersActions.clearConfirmForm,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SuccessForm);