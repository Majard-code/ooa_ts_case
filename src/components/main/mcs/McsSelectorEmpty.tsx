import React from 'react';
import styled from 'styled-components';

const SMcsSelectorEmpty = styled.div`
text-align: center;
color: lightgrey;
`;

const McsSelectorEmpty: React.FC = () => {
  return (
    <SMcsSelectorEmpty>ПУСТО</SMcsSelectorEmpty>
  );
}

export default McsSelectorEmpty;
