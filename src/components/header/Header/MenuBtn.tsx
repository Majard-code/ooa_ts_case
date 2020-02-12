import React, { useRef, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { MobMenuActions } from '../../../store/mobMenu/mobMenuActions';
import { IAppState } from '../../../store/reducers';

interface IStyledProps {
  isOpen: boolean,
}

const StyledMenuBtn = styled.div<IStyledProps>`
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 50px;
span, span::before, span::after {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -10px;
  width: 20px;
  background-color: white;
}
span {
  height: ${props => props.isOpen ? 0 : 2}px;
  margin-top: ${props => props.isOpen ? 0 : -1}px;
}
span::before {
  display: block;
  content: '';
  margin-top: -1px;
  height: 2px;
  transform: ${props => props.isOpen ? 'rotateZ(225deg)' : 'translateY(-7px)'};
  transition: 300ms;
}
span::after {
  display: block;
  content: '';
  margin-top: -1px;
  height: 2px;
  transform: ${props => props.isOpen ? 'rotateZ(-225deg)' : 'translateY(7px)'};
  transition: 200ms;
}
`;

const MenuBtn: React.FC<TPropsFromRedux> = props => {
  const menuBtnRef = useRef<HTMLDivElement>(null);

  const saveMenuBtnRef = props.saveMenuBtnRef;
  useEffect(() => {
    saveMenuBtnRef(menuBtnRef);
  }, [saveMenuBtnRef]);
  return (
    <StyledMenuBtn ref={menuBtnRef} onClick={props.isOpen ? props.mobMenuClose : props.mobMenuOpen} isOpen={props.isOpen}>
      <span></span>
    </StyledMenuBtn>
  );
}

const connector = connect((state: IAppState) => ({
  isOpen: state.mobMenu.isOpen,
}), {
  mobMenuOpen: MobMenuActions.mobMenuOpen,
  mobMenuClose: MobMenuActions.mobMenuClose,
  saveMenuBtnRef: MobMenuActions.saveMenuBtnRef,
});
type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MenuBtn);
