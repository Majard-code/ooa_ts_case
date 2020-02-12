import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import ForgetForm from './ForgetForm';
import { IAppState } from '../../../store/reducers';
import { RequestStatus } from '../../../utils/enums';
import ForgetSuccess from './ForgetSuccess';
import { ForgetActions } from '../../../store/forget/forgetActions';
import { toFormData } from '../../../utils/utils';

const StyledForget = styled.section`
display: grid;
align-items: center;
justify-items: center;
width: 100%;
height: 100%;
`;

const Forget: React.FC<TPropsFromRedux> = props => {

  const { clearForget } = props;

  useEffect (() => {
    return () => {
      clearForget();
    }
  }, [clearForget]);
  
  return (
    <StyledForget>
      {props.forgetStatus !== RequestStatus.Success && <ForgetForm forgetErrors={props.forgetErrors} forgetStatus={props.forgetStatus} onSubmit={(data: any) => props.forgetUser(toFormData(data))}/>}
      {props.forgetStatus === RequestStatus.Success && <ForgetSuccess />}
    </StyledForget>
  );
}

const connector = connect(((state: IAppState) => ({
  forgetStatus: state.forget.forgetStatus,
  forgetErrors: state.forget.errors,
})), {
  forgetUser: ForgetActions.forgetUser,
  clearForget: ForgetActions.clearForget,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Forget);
