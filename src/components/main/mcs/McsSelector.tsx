import React from 'react';
import styled from 'styled-components';
import McsSelectorArrow from './McsSelectorArrow';
import { McsSelectorType } from '../../../utils/enums';
import { ActionWithPayload } from '../../../store/action-helper';

const SMcsSelector = styled.div`
cursor: pointer;
display: grid;
grid-template-columns: 1fr max-content;
width: 100%;
line-height: 40px;
margin: 20px 0;
border: 1px solid lightgray;
font-weight: 700;
p {
  margin-left: 20px;
}
`;

interface IProps {
  type: McsSelectorType,
  name: string,
  active: McsSelectorType | null,
  setMcsSelector: (payload: McsSelectorType) => ActionWithPayload<"SET_MCS_SELECTOR", McsSelectorType>
}

const McsSelector: React.FC<IProps> = props => {
  return (
    <SMcsSelector onClick={() => props.setMcsSelector(props.type)}>
      <p>{props.name}</p>
      <McsSelectorArrow isOpen={props.active === props.type ? true : false} />
    </SMcsSelector>
  );
}

export default McsSelector;
