import * as React from 'react';

import { Children, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import media from '@styles/media';

let start = 0;
let diff = 0;
let now = 0;

interface CarouselProps {
  children: React.ReactNode;
  isLineBreak?: boolean;
  isCentralize?: boolean;
  count: number;
  setCount: (num: number) => void;
  maxCount?: number;
  setCurrent?: (count: number) => void;
}

interface styleProps {
  isLineBreak?: boolean;
  isCentralize?: boolean;
}

const Carousel = ({
  children,
  isLineBreak,
  isCentralize,
  count,
  setCount,
  setCurrent,
  maxCount,
}: CarouselProps) => {
  const carouselRef = useRef<HTMLInputElement>(null);

  const itemLength = maxCount || Children.count(children);
  const swipePoint = 50;

  const touchStart = (e: React.TouchEvent) => {
    start = e.changedTouches[0].clientX;
  };

  const touchMove = (e: React.TouchEvent) => {
    now = e.touches[0].clientX;
    diff = now - start;
  };

  const touchEnd = () => {
    if (diff < -swipePoint) {
      // 오른쪽 -> 왼쪽 swipe
      if (count >= itemLength - 1) return;
      const nextCount = (count += 1);
      setCount(nextCount);
    } else if (diff > swipePoint) {
      // 왼쪽 -> 오른쪽 swipe
      if (count === 0) return;
      const nextCount = (count -= 1);
      setCount(nextCount);
    }
    diff = 0;
  };

  useEffect(() => {
    if (carouselRef.current === null) return;
    let calculation = count * 87.5 + 'vw';
    if (carouselRef.current.clientWidth === media.laptop)
      calculation = count * 33.33 + '%';
    carouselRef.current.style.transition =
      'all 0.4s cubic-bezier(0.8, 0, 0.2, 1)';
    carouselRef.current.style.transform = `translateX(-${calculation})`;
  }, [count]);

  useEffect(() => {
    if (!setCurrent) return;
    setCurrent(count);
    return () => {
      if (setCurrent) setCurrent(count);
    };
  }, [count]);

  return (
    <Wrapper
      ref={carouselRef}
      onTouchMove={touchMove}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      isLineBreak={isLineBreak}
      isCentralize={isCentralize}
    >
      {children}
    </Wrapper>
  );
};

Carousel.defaultProps = {
  isLineBreak: false,
  isCentralize: false,
  maxCount: 0,
};

export default Carousel;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  @media (max-width: ${media.mobileL}px) {
    flex-wrap: nowrap;
    padding-left: 7.5vw;
    justify-content: start;
  }
  ${(props: styleProps) =>
    props.isLineBreak &&
    css`
      flex-wrap: wrap;
    `};
  ${(props: styleProps) =>
    props.isCentralize &&
    css`
      justify-content: center;
    `};
`;
