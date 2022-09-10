import * as React from 'react';

import { useEffect, useRef } from 'react';

import CategoryList from './CategoryList';
import styled from 'styled-components';

interface CategoryProps {
  getNewMiddleList: (HTMLInputElement: any) => void;
  getNewBottomList: (HTMLInputElement: any) => void;
  handleBottomCurrentIndex: (HTMLInputElement: any) => void;
  topList: string[];
  middleList: string[];
  bottomList: string[];
  currentIndex: { top: number; middle: number; bottom: number };
}

const Category = ({
  getNewMiddleList,
  getNewBottomList,
  handleBottomCurrentIndex,
  topList,
  middleList,
  bottomList,
  currentIndex,
}: CategoryProps) => {
  const middleScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  const handleMiddleList = (e) => {
    getNewMiddleList(e.target.innerText);
  };

  const handleBottomList = (e) => {
    getNewBottomList(e.target.innerText);
  };

  const handleBottomIndex = (e) => {
    handleBottomCurrentIndex(e.target.innerText);
  };

  useEffect(() => {
    if (bottomScrollRef.current === null) return;
    bottomScrollRef.current.scrollTo({
      top: bottomScrollRef.current.scrollTop,
      left: 0,
      behavior: 'auto',
    });
  }, [bottomList]);

  useEffect(() => {
    if (middleScrollRef.current === null) return;
    middleScrollRef.current.scrollTo({
      top: middleScrollRef.current.scrollTop,
      left: 0,
      behavior: 'auto',
    });
  }, [middleList]);

  return (
    <>
      <BackgroundBar color="#F6F3FD">
        <CategoryList
          categoryList={topList}
          listPosition={'top'}
          currentIndex={currentIndex}
          handleList={handleMiddleList}
          isTop
        />
      </BackgroundBar>
      <BackgroundBar ref={middleScrollRef} color="#EAE3FF">
        <CategoryList
          categoryList={middleList}
          listPosition={'middle'}
          currentIndex={currentIndex}
          handleList={handleBottomList}
        />
      </BackgroundBar>
      {bottomList[currentIndex.bottom] && (
        <BackgroundBar ref={bottomScrollRef} color="#F1ECFF">
          <CategoryList
            categoryList={bottomList}
            listPosition={'bottom'}
            currentIndex={currentIndex}
            handleList={handleBottomIndex}
          />
        </BackgroundBar>
      )}
    </>
  );
};

const BackgroundBar = styled.div`
  background-color: ${(props) => props.color};
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Category;
