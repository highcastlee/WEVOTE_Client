import { createStyles, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';

import initialCalendar from '@img/calendar.svg';
import media from '@styles/media';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import { theme } from '@components/Admin/materialStyle';
import useFetch from '@hooks/useFetch';

const ImgBoard = () => {
  const classes = useStyles();
  const [{ loading, data, error }, fetchData] = useFetch(
    '/api/v1/main/calendar'
  );
  const [image, setImage] = useState<string>();

  const handleImgError = () => {
    setImage(initialCalendar);
  };

  useEffect(() => {
    if (!data) return;
    setImage(data.image);
    return () => setImage(data.image);
  }, [data]);

  return (
    <Calendar>
      {loading ? (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      ) : (
        <CalendarImg src={image} alt="calendar" onError={handleImgError} />
      )}
    </Calendar>
  );
};

export default ImgBoard;

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      width: '95%',
      minWidth: '312px',
      minHeight: '400px',
      margin: '0 auto',
      borderRadius: '20px',
      [theme.breakpoints.up('mobile')]: {
        minHeight: '700px',
        maxHeight: '100%',
      },
    },
  })
);

const Calendar = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${media.mobileL}px) {
    margin-top: 0rem;
  }
`;

// 이미지 4:3 비율
const CalendarImg = styled.img`
  margin: 0 auto;
  width: 95%;
  min-height: 700px;
  max-height: 100%;
  border-radius: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  @media (max-width: ${media.mobileL}px) {
    min-width: 312px;
    min-height: 400px;
    margin: 0 auto;
  }
`;
