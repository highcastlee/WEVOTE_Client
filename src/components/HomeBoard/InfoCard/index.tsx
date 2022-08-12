import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import media from '@styles/media';
import Skeleton from '@material-ui/lab/Skeleton';
import Slide from './Slide';
import styled from 'styled-components';
import useFetch from '@hooks/useFetch';

const initialData = [
  {
    id: null,
    name: '미등록',
    numOfTeam: 0,
    type: '미정',
  },
  {
    id: null,
    name: '미등록',
    numOfTeam: 0,
    type: '미정',
  },
  {
    id: null,
    name: '미등록',
    numOfTeam: 0,
    type: '미정',
  },
];

const slideSize = 204;
const slidePerPage = 3;

const InfoCard = () => {
  const classes = useStyles();
  const [{ loading, data, error }, fetchData] = useFetch(
    '/api/v1/main/election'
  );
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideRef = useRef<any>();

  const lastIndex = data ? data.length : 0;

  const nextSlide = () => {
    if (currentSlide + (slidePerPage - 1) >= lastIndex - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(lastIndex - 1 - (slidePerPage - 1));
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${
      currentSlide * slideSize
    }px)`; // 이동하는 애니메이션
    return () => {
      null;
    };
  }, [currentSlide]);

  const renderCard = () =>
    data &&
    data.map((obj, i) => {
      const uri = obj.id ? `/promise/promise-detail/${obj.id}` : '/';
      return (
        <Link key={i} to={uri}>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.card}
            />
          ) : (
            <Slide data={data[i]} />
          )}
        </Link>
      );
    });

  return (
    <Container>
      <SliderContainer ref={slideRef}>{renderCard()}</SliderContainer>
      {!loading && (
        <ButtonContainer>
          <Button onClick={prevSlide}>Prev</Button>
          <Button onClick={nextSlide}>Next</Button>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default InfoCard;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'inline-block',
      width: '170px',
      height: '224px',
      marginRight: '34px',
      borderRadius: '2rem',
    },
  })
);

const Container = styled.div`
  @media (max-width: ${media.mobileL}px) {
    display: none;
  }
  overflow: hidden;
  width: 60rem;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  all: unset;
  border: 1px solid #5d3fe8;
  margin-left: 1rem;
  padding: 0.5em 2em;
  color: #5d3fe8;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    border: 1px solid #252c44;
    background-color: #252c44;
    color: #fff;
  }
`;
