import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../../store/reducers';
import { MobMenuActions } from '../../../store/mobMenu/mobMenuActions';
import MobMenuItem from './MobMenuItem';
import { IMenuItem } from '../../../store/mobMenu/mobMenuReducer';

interface IStyledProps {
  menuItems: IMenuItem[],
  isOpen: boolean,
}

const StyledMobMenu = styled.nav<IStyledProps>`
  display: grid;
  grid-template-rows: 1fr;
  position: absolute;
  top: ${props => props.isOpen ? 0 : -(110 + (props.menuItems.length * 50))}px;
  left: 0;
  right: 0;
  width: 100%;
  height: ${props => 110 + (props.menuItems.length * 50)}px;
  margin: 0 auto;
  padding: 90px 0 20px 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 300;
  transition: 300ms;
`;

const MobMenu: React.FC<TPropsFromRedux> = props => {
  const myRef = useRef<HTMLElement>(null);

  const handleClickOutside: EventListener = (e: any) => {
    if (myRef.current) {
      if (!myRef.current.contains(e.target) && !props.menuBtnRef?.current?.contains(e.target)) {
        props.mobMenuClose();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <StyledMobMenu ref={myRef} isOpen={props.isOpen} menuItems={props.menuItems}>
      {props.isOpen && props.menuItems.map((menuItem: IMenuItem) => <MobMenuItem key={menuItem.id} menuItem={menuItem} mobMenuClose={props.mobMenuClose} />)}
    </StyledMobMenu>
  );
}

const connector = connect((state: IAppState) => ({
  menuItems: state.mobMenu.menuItems,
  isOpen: state.mobMenu.isOpen,
  menuBtnRef: state.mobMenu.menuBtnRef,
}), {
  mobMenuClose: MobMenuActions.mobMenuClose,
});

type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MobMenu);
