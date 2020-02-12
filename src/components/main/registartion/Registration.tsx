import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import RegistrationForm from './RegistrationForm';
import { IAppState } from '../../../store/reducers';
import { RequestStatus } from '../../../utils/enums';
import RegSuccess from './RegSuccess';
import { RegisterActions } from '../../../store/register/registerActions';
import { toFormData } from '../../../utils/utils';

const StyledRegistration = styled.section`
display: grid;
align-items: center;
justify-items: center;
width: 100%;
height: 100%;
`;

const Registration: React.FC<TPropsFromRedux> = props => {

  const { clearRegister } = props;

  useEffect (() => {
    return () => {
      clearRegister();
    }
  }, [clearRegister]);
  
  return (
    <StyledRegistration>
      {props.regStatus !== RequestStatus.Success && <RegistrationForm regErrors={props.regErrors} regStatus={props.regStatus} onSubmit={(formData: any) => props.registerUser(toFormData(formData))}/>}
      {props.regStatus === RequestStatus.Success && <RegSuccess />}
    </StyledRegistration>
  );
}

const connector = connect(((state: IAppState) => ({
  regStatus: state.register.registerStatus,
  regErrors: state.register.errors,
})), {
  registerUser: RegisterActions.registerUser,
  clearRegister: RegisterActions.clearRegister,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Registration);
