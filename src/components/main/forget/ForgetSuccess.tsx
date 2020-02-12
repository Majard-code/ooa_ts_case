import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../uiComponents/Button';
import { useHistory } from 'react-router-dom';
import { IAppState } from '../../../store/reducers';
import Form from '../../uiComponents/Form';

const ForgetSuccess: React.FC<TPropsFromRedux> = (props) => {
  const history = useHistory();
  return (
    <Form>
      <div>{props.message}</div>
      <Button onClick={() => history.push('/login')}>Ok</Button>
    </Form>
  );
}

const connector = connect((state: IAppState) => ({
  message: state.forget.message,
}));

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ForgetSuccess);