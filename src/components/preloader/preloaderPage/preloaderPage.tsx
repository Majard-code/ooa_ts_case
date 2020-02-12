import React from 'react';
import styled from 'styled-components';
import Preloader from '../preloader';

const StyledPreloaderPage = styled.div`
display: grid;
align-items: center;
justify-items: center;
width: 100%;
height: 100%;
`;

const PreloaderPage: React.FC =  ()  => {
  return (
    <StyledPreloaderPage>
      <Preloader size={70} />
    </StyledPreloaderPage>
  );
};

export default PreloaderPage;
