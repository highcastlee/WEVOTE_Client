import * as React from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';

import Carousel from '@components/Carousel';
import defaultImg from '@img/errorImage.jpg';
import InformationIcon from '@icon/InformationIcon.svg';
import Loader from '@components/Loader';
import media from '@styles/media';
import styled from 'styled-components';
import theme from '@styles/theme';
import useFetch from '@hooks/useFetch';

interface styleProps {
  locationX?: number;
  mobileMargin?: number;
  laptopMargin?: number;
  MobileBoxSize?: number;
}

const LaptopBoxSize = 480;
const MobileBoxSize = 80;
const moveWidth = media.laptop;

export function Info() {
  const [{ loading, data, error }, fetchData] = useFetch('/api/v1/admin/info');
  const [count, setCount] = useState<number>(0);
  const [isLapTop, setIsLapTop] = useState<boolean>(false);
  const infoWrapRef = useRef<HTMLDivElement>(null);

  const infoTitle = '선거 안내';
  const laptopMargin = (moveWidth - LaptopBoxSize) / 2;
  const mobileMargin =
    (window.innerWidth - (window.innerWidth * MobileBoxSize) / 100) / 2;

  const onMoveRight = () => {
    if (!data) return;
    if (count >= data.length - 1) return;
    setCount(count + 1);
  };

  const onMoveLeft = () => {
    if (count === 0) return;
    setCount(count - 1);
  };

  const handleImgError = (e) => {
    e.target.src = defaultImg;
  };

  useEffect(() => {
    if (infoWrapRef.current === null) return;
    if (infoWrapRef.current.clientWidth >= media.laptop) {
      setIsLapTop(true);
      const calculation = count * 100 + '%';
      infoWrapRef.current.style.transition =
        'all 0.4s cubic-bezier(0.8, 0, 0.2, 1)';
      infoWrapRef.current.style.transform = `translateX(-${calculation})`;
    }
  }, [count]);

  const showTeamCard = () => {
    return (
      data &&
      data.map((obj, index) => (
        <Box
          key={index}
          laptopMargin={laptopMargin}
          mobileMargin={mobileMargin}
          MobileBoxSize={MobileBoxSize}
        >
          <Img src={obj.image} alt="information" onError={handleImgError} />
        </Box>
      ))
    );
  };

  return (
    <Article>
      <IconBlock>
        <Icon src={InformationIcon} alt="information icon" />
        <Title>{infoTitle}</Title>
      </IconBlock>
      {loading ? (
        <Loader />
      ) : (
        <InfoWrapper ref={infoWrapRef}>
          <Carousel setCount={setCount} count={isLapTop ? 0 : count}>
            {showTeamCard()}
          </Carousel>
        </InfoWrapper>
      )}
      <LeftIcon onClick={onMoveLeft} />
      <RightIcon onClick={onMoveRight} />
    </Article>
  );
}

const InfoWrapper = styled.div`
  width: 100%;
`;

const Article = styled.article`
  position: relative;
  width: ${media.laptop}px;
  margin: 0 auto;
  padding: 30px 0;
  overflow-x: hidden;
  @media (max-width: ${media.mobileL}px) {
    width: 100%;
    min-width: 320px;
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 auto;
`;

const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 20px ${theme.CardShadow}4d;
  border: 1px solid ${theme.CardDash};
  border-radius: 25px;
  overflow: hidden;
  box-sizing: border-box;
  @media (min-width: ${media.mobileL + 1}px) {
    margin: 20px ${(props: styleProps) => props.laptopMargin}px;
    min-width: ${LaptopBoxSize}px;
  }
  @media (max-width: ${media.mobileL}px) {
    margin: 20px 5vw 20px 2.5vw;
    max-width: ${(props: styleProps) => props.MobileBoxSize}vw;
    min-width: ${(props: styleProps) => props.MobileBoxSize}vw;
    flex: 1 0;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
const LeftIcon = styled(BsChevronLeft)`
  position: absolute;
  top: 50%;
  left: 150px;
  color: ${theme.DarkBlue};
  width: 50px;
  height: 80px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
    color: ${theme.Blue};
  }
  @media (max-width: ${media.mobileL}px) {
    display: none;
  }
`;

const RightIcon = styled(BsChevronRight)`
  position: absolute;
  top: 50%;
  right: 150px;
  color: ${theme.DarkBlue};
  width: 50px;
  height: 80px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
    color: ${theme.Blue};
  }
  @media (max-width: ${media.mobileL}px) {
    display: none;
  }
`;

const Title = styled.h2`
  display: inline-block;
  font-size: 2.2rem;
  font-weight: bold;
  color: ${theme.Blue};
  margin: 20px 0px;
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.6rem;
  }
`;
