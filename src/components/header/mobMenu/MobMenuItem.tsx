import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Action } from '../../../store/action-helper';
import { IMenuItem } from '../../../store/mobMenu/mobMenuReducer';
import { fadeInDown } from '../../../animations/Keyframes';

interface IStyledProps {
  menuItemId: number,
}

const StyledMobMenuItem = styled.div<IStyledProps>`
display: grid;
align-items: center;
justify-items: center;
height: 50px;
font-weight: 700;
animation: ${fadeInDown} 300ms ease-out ${props => props.menuItemId * 100}ms both;
`;

interface IProps {
  menuItem: IMenuItem,
  mobMenuClose: () => Action<'MOB_MENU_CLOSE'>,
}

const MobMenuItem: React.FC<IProps> = (props) => {
  return (
    <StyledMobMenuItem menuItemId={props.menuItem.id}>
      <NavLink to={props.menuItem.url} onClick={props.mobMenuClose}>{props.menuItem.name}</NavLink>
    </StyledMobMenuItem>
  );
}

export default MobMenuItem;
