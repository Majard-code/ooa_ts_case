import React from 'react';
import styled from 'styled-components';
import { spin } from '../../animations/Keyframes';

interface Props {
  size: number,
}

const StyledPreloader = styled.div<Props>`
display: block;
width: ${props => props.size}px;
height: ${props => props.size}px;
animation: 10s linear infinite ${spin};
img {
  width: 100%;
  height: 100%;
}
`;

const Preloader: React.FC<Props> =  props  => {
  return (
    <StyledPreloader size={props.size}>
      <img src={require('./preloader.svg')} alt="Preloader" />
    </StyledPreloader>
  );
};

export default Preloader;
