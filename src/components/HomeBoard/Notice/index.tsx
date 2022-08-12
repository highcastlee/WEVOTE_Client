import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import bannerIcon from '@icon/bannerIcon.svg';
import { getFormatDate } from '@utils/getFunction';
import media from '@styles/media';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import useFetch from '@hooks/useFetch';

const initialData = [
  {
    id: 0,
    content: '공지사항 없음',
    startDate: new Date(),
    endDate: new Date(),
  },
];

const Notice = () => {
  const classes = useStyles();
  const [{ loading, data, error }, fetchData] = useFetch('/api/v1/main/banner');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (!data) return;
    const lastIndex = data.length - 1;
    let interval;
    interval = setInterval(() => {
      setIndex(index < lastIndex ? index + 1 : 0);
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <NoticeBoard>
      {loading ? (
        <Skeleton
          animation="wave"
          variant="rect"
          className={classes.container}
        />
      ) : (
        <Container>
          {data && (
            <div>
              <TitleBox>Notice</TitleBox>
              <ArticleBox>
                <Article>{data[index].content}</Article>
              </ArticleBox>
              <Day>{`${getFormatDate(
                new Date(data[index].startDate)
              )} ~ ${getFormatDate(new Date(data[index].endDate))}`}</Day>
            </div>
          )}
          <BIcon />
        </Container>
      )}
    </NoticeBoard>
  );
};

export default Notice;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      width: '95%',
      height: '9.2rem',
      marginLeft: '11px',
      borderRadius: '10px',
      [theme.breakpoints.up('mobile')]: {
        width: '57.8rem',
        height: '13.6rem',
        marginLeft: '0',
      },
    },
  })
);

const NoticeBoard = styled.div``;
const Container = styled.div`
  position: relative;
  width: 57.8rem;
  height: 13.6rem;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px #8881ae;
  border-radius: 10px;
  @media (max-width: ${media.mobileL}px) {
    width: 95%;
    height: 9.2rem;
    margin-left: 11px;
  }
`;

const BIcon = styled.img.attrs({
  src: bannerIcon,
  alt: 'data icon',
})`
  width: 165px;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.5;
  @media (max-width: ${media.mobileL}px) {
    width: 130px;
    top: -15px;
  }
`;

const TitleBox = styled.div`
  display: inline-block;
  margin-top: 1.26rem;
  margin-left: 1.8rem;
  width: 8.4rem;
  height: 2.8rem;
  background-color: #5d3fe8;
  border-radius: 2rem;
  color: #ffffff;
  text-align: center;
  line-height: 2.8rem;
  font-size: 14px;

  @media (max-width: ${media.mobileL}px) {
    margin-top: 1rem;
    margin-left: 1rem;
    width: 6.2rem;
    height: 2rem;
    background-color: #5d3fe8;
    border-radius: 2rem;
    color: #ffffff;
    text-align: center;
    line-height: 1.8rem;
    font-size: 11px;
  }
`;

const ArticleBox = styled.div`
  display: block;
  background-color: #f6f3fd;
  margin-top: 1.5rem;
  width: 57.8rem;
  height: 3.7rem;
  @media (max-width: ${media.mobileL}px) {
    width: 100%;
    height: 2.8rem;
  }
`;

const Article = styled.div`
  margin-left: 2rem;
  font-size: 1.6rem;
  line-height: 3.5rem;
  @media (max-width: ${media.mobileL}px) {
    margin-left: 1.5rem;
    font-size: 1.2rem;
    line-height: 3rem;
  }
`;

const Day = styled.div`
  margin-top: 1.86rem;
  margin-left: 39.4rem;
  font-size: 1.3rem;
  @media (max-width: ${media.mobileL}px) {
    display: none;
  }
`;
