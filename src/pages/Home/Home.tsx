import * as React from 'react';

import { Calendar, InfoCardSlide, Notice } from './Board';

import CandidateClassification from '@components/Common/CandidateClassification';
import media from '@styles/media';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <Board>
        <div>
          <InfoCardSlide />
        </div>
        <div>
          <Notice />
        </div>
        <ImgArea>
          <Calendar />
        </ImgArea>
      </Board>
      <CandidateClassification />
    </>
  );
};

export default Home;

const Board = styled.section`
  width: ${media.laptop}px;
  margin: 60px auto;
  display: grid;
  row-gap: 30px;
  grid-template-rows: repeat(3, 270px);
  grid-template-columns: repeat(2, 640px);
  @media (max-width: ${media.mobileL}px) {
    width: 100%;
    row-gap: 10px;
    grid-template-rows: repeat(3, auto);
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ImgArea = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2;
  @media (max-width: ${media.mobileL}px) {
    grid-column: 1;
    grid-row: 2;
  }
`;
