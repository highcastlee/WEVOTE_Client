import * as React from 'react';

import styled, { css } from 'styled-components';

import media from '@styles/media';
import theme from '@styles/theme';

interface CategoryListProps {
  categoryList: string[];
  listPosition: string;
  currentIndex: { top: number; middle: number; bottom: number };
  handleList: (e: any) => void;
  isTop?: boolean;
}

interface CategoryListStyle {
  isTop?: boolean;
}

interface CategoryItemStyle {
  isActive: boolean;
  isTop?: boolean;
}

function CategoryList({
  categoryList,
  listPosition,
  currentIndex,
  handleList,
  isTop,
}: CategoryListProps) {
  return (
    <List>
      {categoryList.length &&
        categoryList.map((item, index) => (
          <CategoryItem
            key={index}
            onClick={handleList}
            isActive={item === categoryList[currentIndex[listPosition]]}
            isTop={isTop}
          >
            <p>{item}</p>
          </CategoryItem>
        ))}
    </List>
  );
}

const CategoryItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: Transparent;
  -webkit-appearance: none;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  p {
    font-size: 1.6rem;
    font-family: 'paybooc-medium', 'sans-serif';
    line-height: 22px;
    text-align: center;
    color: black;
  }
  &:hover {
    background-color: white;
    p {
      color: ${theme.Blue};
    }
  }
  @media (max-width: ${media.mobileL}px) {
    p {
      font-size: 1.2rem;
    }
  }

  ${(props: CategoryItemStyle) =>
    props.isActive &&
    css`
      background-color: white;
      border-bottom: 2px solid ${theme.Blue};
      p {
        color: ${theme.Blue};
      }
    `};

  ${(props: CategoryItemStyle) =>
    props.isTop &&
    css`
      width: 33.3%;
      padding: 0;
      @media (max-width: ${media.mobileL}px) {
        p {
          font-size: 1.4rem;
        }
      }
    `};
`;

const List = styled.ul`
  width: ${media.laptop}px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: ${media.mobileL}px) {
    flex-wrap: nowrap;
    width: max-content;
    margin: 0;
  }
  ${(props: CategoryListStyle) =>
    props.isTop &&
    css`
      max-width: 100%;
      width: ${media.laptop}px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      @media (max-width: ${media.mobileL}px) {
        width: 100%;
      }
    `};
`;

export default CategoryList;
