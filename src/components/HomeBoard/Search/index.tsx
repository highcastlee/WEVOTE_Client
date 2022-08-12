import { createStyles, makeStyles, Theme } from '@material-ui/core';

import media from '@styles/media';
import ModalSearchBox from './ModalSearchBox';
import React from 'react';
import SearchBox from './SearchBox';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import useFetch from '@hooks/useFetch';

const homeText = {
  title: '서울과학기술대학교 선거소식',
};

const initialData = [{ id: 0, name: '없음' }];
const Search = () => {
  const classes = useStyles();
  const [{ loading, data, error }, fetchData] = useFetch('/api/v1/main/search');
  return (
    <Contain>
      {loading ? (
        <>
          <Skeleton animation="wave" variant="rect" className={classes.title} />
          <Skeleton
            animation="wave"
            variant="rect"
            className={classes.searchWrapper}
          />
        </>
      ) : (
        <>
          <Title>{homeText.title}</Title>
          <SearchWrapper>
            <SearchBox data={data} />
          </SearchWrapper>
        </>
      )}
      {!loading && (
        <MobileArea>
          <ModalSearchBox data={data} />
        </MobileArea>
      )}
    </Contain>
  );
};

export default Search;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      width: '250px',
      height: '50px',
      borderRadius: '20px',
      marginTop: '3.7rem',
      marginLeft: '11px',
      [theme.breakpoints.up('mobile')]: {
        marginTop: '10.4rem',
        marginLeft: '0',
      },
    },
    searchWrapper: {
      display: 'none',
      [theme.breakpoints.up('mobile')]: {
        display: 'block',
        position: 'relative',
        width: '400px',
        height: '50px',
        borderRadius: '20px',
        marginTop: '20px',
      },
    },
  })
);

const Contain = styled.div``;

const Title = styled.h1`
  font-family: 'paybooc-extrabold';
  font-size: 4rem;
  font-weight: 800;
  line-height: 49.36px;
  color: #252c44;
  margin-top: 10.4rem;
  margin-left: 1.6rem;
  @media (max-width: ${media.mobileL}px) {
    font-size: 2.1rem;
    margin-top: 3.7rem;
    margin-left: 1.7rem;
  }
`;
const SearchWrapper = styled.div`
  position: relative;
  @media (max-width: ${media.mobileL}px) {
    display: none;
  }
`;

const MobileArea = styled.div`
  display: none;
  @media (max-width: ${media.mobileL}px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: grey;
  }
`;
