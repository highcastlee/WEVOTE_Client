import React, { useEffect, useState } from 'react';

import media from '@styles/media';
import styled from 'styled-components';
import useFetch from '@hooks/useFetch';

interface dataType {
  id: number;
  content: string;
  startDate: string;
  endDate: string;
}

const NoticeArticle = () => {
  const [{ loading, data, error }, fetchData] = useFetch('/api/v1/main/banner');
  const [banner, setBanner] = useState<dataType[]>(data);
  const [index, setIndex] = useState<number>(0);

  const dateFormat = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    if (!data) return;
    const temp: dataType[] = [];
    data.map((data) => {
      const sdate = dateFormat(new Date(data.startDate));
      const edate = dateFormat(new Date(data.endDate));
      temp.push({
        id: data.id,
        content: data.content,
        startDate: sdate,
        endDate: edate,
      });
    });
    setBanner(temp);
    return () => setBanner(data);
  }, [data]);

  useEffect(() => {
    const lastIndex = banner.length - 1;
    let interval;
    if (index < lastIndex) {
      interval = setInterval(() => {
        setIndex(index + 1);
      }, 5000);
    } else {
      setTimeout(() => {
        setIndex(0);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [index]);

  return (
    <Container>
      {data && (
        <div>
          <TitleBox>Notice</TitleBox>
          <ArticleBox>
            <Article>{banner[index].content}</Article>
          </ArticleBox>
          <Day>{`${banner[index].startDate} ~ ${banner[index].endDate}`}</Day>
        </div>
      )}
    </Container>
  );
};

export default NoticeArticle;
const Container = styled.div``;
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
