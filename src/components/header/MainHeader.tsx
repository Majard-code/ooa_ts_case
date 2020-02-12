import React from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import MobMenu from './mobMenu/MobMenu';

const MainHeaderSC = styled.div`
position: relative;
width: 100%;
height: max-content;
z-index: 200;
`;

const MainHeader: React.FC = () => {
  return (
    <MainHeaderSC>
      <Header />
      <MobMenu />
    </MainHeaderSC>
  );
}

export default MainHeader;
