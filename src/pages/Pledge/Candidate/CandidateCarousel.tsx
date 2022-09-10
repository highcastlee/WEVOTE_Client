import * as React from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styled, { css } from 'styled-components';

import CandidateCard from '@components/CandidateCard';
import Carousel from '@components//Carousel';
import media from '@styles/media';
import { Team } from 'candidateType';
import theme from '@styles/theme';
import { useState } from 'react';

interface CandidateArticleProps {
  title: string;
  teamArr: Team[];
  current: number;
  setCurrent: (id: number) => void;
}

interface styleProps {
  isCurrent?: boolean;
  mobileMargin?: number;
  laptopMargin?: number;
  MobileBoxSize?: number;
}

const BoxSize = 360;
const MobileBoxSize = 80;

export function CandidateCarousel({
  title,
  teamArr,
  current,
  setCurrent,
}: CandidateArticleProps) {
  const [count, setCount] = useState(0);

  const laptopMargin = (media.laptop - BoxSize * 3) / 6;
  const mobileMargin = (window.innerWidth - window.innerWidth * 0.75) / 2;

  const onMoveRight = () => {
    if (count + 2 >= teamArr.length - 1) return;
    const cal = count + 1; // 3*Math.floor(count/3)+3;
    setCount(cal);
    setCurrent(cal);
  };

  const onMoveLeft = () => {
    if (count === 0) return;
    const cal = count - 1; //3*Math.floor(count/3)-1;
    setCount(cal);
    setCurrent(cal);
  };

  const showTeamCard = () => {
    return (
      teamArr &&
      teamArr.map((obj, index) => (
        <Box
          key={index}
          isCurrent={current === index}
          onClick={() => setCurrent(index)}
          MobileBoxSize={MobileBoxSize}
          laptopMargin={laptopMargin}
          mobileMargin={mobileMargin}
        >
          <CandidateCard teamData={obj} />
        </Box>
      ))
    );
  };

  return (
    <Background>
      <Article>
        <BarIcon>l</BarIcon>
        <CandidateTitle>{title} 후보</CandidateTitle>
        <InnerArticle>
          <Carousel
            isCentralize={teamArr.length < 3}
            count={count}
            setCount={setCount}
            setCurrent={setCurrent}
            maxCount={teamArr.length}
          >
            {showTeamCard()}
          </Carousel>
          <LeftIcon onClick={onMoveLeft} />
          <RightIcon onClick={onMoveRight} />
        </InnerArticle>
      </Article>
    </Background>
  );
}

const Background = styled.section`
  background-color: ${theme.Blue};
  width: 100%;
  height: 650px;
  margin-bottom: -25px;
  @media (max-width: ${media.mobileL}px) {
    height: 600px;
  }
`;

const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px ${theme.BackgroundWhite};
  border: 1px solid ${theme.CardDash};
  border-radius: 25px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  @media (min-width: ${media.mobileL + 1}px) {
    margin: 20px ${(props: styleProps) => props.laptopMargin}px;
    min-width: ${BoxSize}px;
  }
  @media (max-width: ${media.mobileL}px) {
    margin: 20px 5vw 20px 2.5vw;
    max-width: ${(props: styleProps) => props.MobileBoxSize}vw;
    min-width: ${(props: styleProps) => props.MobileBoxSize}vw;
    flex: 1 0;
  }
  ${(props: styleProps) =>
    !props.isCurrent &&
    css`
      opacity: 0.5;
      box-shadow: 0px 0px 0px 0px ${theme.BackgroundWhite};
      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    `};
`;

const BarIcon = styled.span`
  font-size: 2.8rem;
  font-weight: bold;
  color: white;
  font-family: 'paybooc-extrabold', sans-serif;
  vertical-align: sub;
  margin-left: 20px;
  margin-right: 10px;
`;

const CandidateTitle = styled.h2`
  display: inline-block;
  font-size: 2.2rem;
  font-weight: bold;
  color: white;
  margin: 20px 0px;
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.6rem;
  }
`;

const Article = styled.article`
  width: ${media.laptop}px;
  margin: 0 auto;
  padding: 30px 0;
  @media (max-width: ${media.mobileL}px) {
    width: 100%;
    min-width: 320px;
  }
`;

const LeftIcon = styled(BsChevronLeft)`
  position: absolute;
  top: 40%;
  left: -10px;
  color: ${theme.LightGray};
  width: 50px;
  height: 80px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
    color: ${theme.DarkBlue};
  }
  @media (max-width: ${media.mobileL}px) {
    display: none;
  }
`;

const RightIcon = styled(BsChevronRight)`
  position: absolute;
  top: 40%;
  right: -10px;
  color: ${theme.LightGray};
  width: 50px;
  height: 80px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
    color: ${theme.DarkBlue};
  }
  @media (max-width: ${media.mobileL}px) {
    display: none;
  }
`;

const InnerArticle = styled.article`
  position: relative;
  overflow: hidden;
`;
