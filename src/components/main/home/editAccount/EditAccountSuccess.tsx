import React from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../../uiComponents/Button';
import { IAppState } from '../../../../store/reducers';
import { fadeInDown } from '../../../../animations/Keyframes';
import { AccountActions } from '../../../../store/account/accountActions';

const StyledEditAccountSuccess = styled.section`
display: grid;
justify-items: center;
gap: 15px;
max-width: 320px;
height: auto;
margin: auto;
padding: 20px;
text-align: center;
box-shadow: 0 0 10px 5px rgb(220, 220, 220);
background-color: rgb(245, 245, 245);
animation: ${fadeInDown} 500ms ease-out both;
`;

const EditAccountSuccess: React.FC<TPropsFromRedux> = (props) => {
  return (
    <StyledEditAccountSuccess>
      <div>{props.message}</div>
      <Button onClick={() => props.clearAccountEdit()}>Ok</Button>
    </StyledEditAccountSuccess>
  );
}

const connector = connect((state: IAppState) => ({
  message: state.account.message,
}), {
  clearAccountEdit: AccountActions.clearAccountEdit,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EditAccountSuccess);