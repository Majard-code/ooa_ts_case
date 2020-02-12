import React from 'react';
import styled from 'styled-components';

interface IProps {
  isOpen: boolean,
}

const SMcsSelectorArrow = styled.div<IProps>`
position: relative;
width: 24px;
height: 24px;
margin: auto;
margin-right: 20px;
span, span::before, span::after {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 10px;
  background-color: black;
}
span {
  height: 0;
  width: 0;
}
span::before {
  display: block;
  content: '';
  margin-top: -1px;
  height: 2px;
  transform: translateX(3px) ${props => props.isOpen ? 'rotateZ(45deg)' : 'rotateZ(315deg)'};
  transition: 400ms;
}
span::after {
  display: block;
  content: '';
  margin-top: -1px;
  height: 2px;
  transform: translateX(-3px) ${props => props.isOpen ? 'rotateZ(-45deg)' : 'rotateZ(-315deg)'};
  transition: 400ms;
}
`;

const McsSelectorArrow: React.FC<IProps> = props => {
  return (
    <SMcsSelectorArrow isOpen={props.isOpen}>
      <span></span>
    </SMcsSelectorArrow>
  );
}

export default McsSelectorArrow;
