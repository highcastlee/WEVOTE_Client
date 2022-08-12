import Calendar from './Calendar';
import InfoCard from './InfoCard';
import media from '@styles/media';
import Notice from './Notice';
import React from 'react';
import Search from './Search';
import styled from 'styled-components';

const HomeBoard = () => {
  return (
    <Board>
      <TitleArea>
        <Search />
      </TitleArea>
      <UserArea>
        <InfoCard />
      </UserArea>
      <NoticeBoard>
        <Notice />
      </NoticeBoard>
      <ImgArea>
        <Calendar />
      </ImgArea>
    </Board>
  );
};

export default HomeBoard;

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

const TitleArea = styled.div``;

const UserArea = styled.div``;

const NoticeBoard = styled.div``;

const ImgArea = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2;
  @media (max-width: ${media.mobileL}px) {
    grid-column: 1;
    grid-row: 2;
  }
`;
