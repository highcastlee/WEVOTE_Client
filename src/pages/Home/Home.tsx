import * as React from 'react';

import { Calendar, InfoCardSlide, Notice } from './Board';

import CandidateClassification from '@components/CandidateClassification/CandidateClassification';
import media from '@styles/media';
import Search from './Board/Search/Search';
import styled from 'styled-components';

export function Home() {
  return (
    <>
      <Board>
        <section>
          <Search />
        </section>
        <section>
          <InfoCardSlide />
        </section>
        <section>
          <Notice />
        </section>
        <ImgArea>
          <Calendar />
        </ImgArea>
      </Board>
      <CandidateClassification />
    </>
  );
}

const Board = styled.article`
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

const ImgArea = styled.section`
  grid-column: 2;
  grid-row: 1 / span 2;
  @media (max-width: ${media.mobileL}px) {
    grid-column: 1;
    grid-row: 2;
  }
`;
