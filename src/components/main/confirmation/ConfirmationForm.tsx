import React from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../uiComponents/Button';
import { useHistory } from 'react-router-dom';
import { IAppState } from '../../../store/reducers';
import { fadeInDown } from '../../../animations/Keyframes';
import { RequestStatus } from '../../../utils/enums';

interface IStyledProps {
  isError: boolean,
}

const StyledConfirmationForm = styled.section<IStyledProps>`
display: grid;
justify-items: center;
gap: 15px;
max-width: 320px;
height: auto;
margin: auto;
padding: 20px;
text-align: center;
color: ${props => props.isError ? 'red' : 'black'};
font-weight: ${props => props.isError ? '700' : '300'};
box-shadow: 0 0 10px 5px rgb(220, 220, 220);
background-color: rgb(245, 245, 245);
animation: ${fadeInDown} 500ms ease-out both;
@media (max-width: 359px) {
  width: 100%;
}
`;

const ConfirmationForm: React.FC<TPropsFromRedux> = (props) => {
  const history = useHistory();
  return (
    <StyledConfirmationForm isError={props.status === RequestStatus.Failed ? true : false}>
      <div>{props.status === RequestStatus.Success ? props.message : props.errors}</div>
      <Button onClick={() => history.push('/')}>Ok</Button>
    </StyledConfirmationForm>
  );
}

const connector = connect((state: IAppState) => ({
  status: state.confirmMail.confirmMailStatus,
  message: state.confirmMail.message,
  errors: state.confirmMail.errors,
}));

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ConfirmationForm);