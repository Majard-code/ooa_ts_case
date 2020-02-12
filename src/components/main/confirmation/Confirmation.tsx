import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IAppState } from '../../../store/reducers';
import { compose } from 'redux';
import { ConfirmMailActions } from '../../../store/confirmMail/confirmMailActions';
import { RequestStatus } from '../../../utils/enums';
import Preloader from '../../preloader/preloader';
import { BIG_PRELOADER_SIZE } from '../../../utils/constants';
import ConfirmationForm from './ConfirmationForm';
import { toFormData } from '../../../utils/utils';

const StyledConfirmation = styled.section`
display: grid;
align-items: center;
justify-items: center;
width: 100%;
height: 100%;
`;

const Confirmation: React.FC<TPropsFromRedux & RouteComponentProps<{ token: string }>> = (props) => {
  const { confirmMail, confirmMailStatus } = props;
  const { token } = props.match.params;
  const { push } = props.history;

  useEffect(() => {
      if (token) {
        if(confirmMailStatus === RequestStatus.Default) {
          confirmMail(toFormData({ token: token }));
        }
      } else {
        push('/');
      }
  }, [confirmMail, push, token, confirmMailStatus]);

  return (
    <StyledConfirmation>
      {props.confirmMailStatus < 2 && <Preloader size={BIG_PRELOADER_SIZE} />}
      {props.confirmMailStatus >= 2 && <ConfirmationForm />}
    </StyledConfirmation>
  );
}

const connector = connect((state: IAppState) => ({
  confirmMailStatus: state.confirmMail.confirmMailStatus,
}), {
  confirmMail: ConfirmMailActions.confirmMail,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default compose<React.FC<TPropsFromRedux & RouteComponentProps<{ token: string }>>>(
  withRouter,
  connector
)(Confirmation);