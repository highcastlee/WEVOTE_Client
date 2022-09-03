import * as React from 'react';

import media from '@styles/media';
import { PledgeCard } from './PledgeCard';
import { PromiseArr } from 'candidateType';
import styled from 'styled-components';
import theme from '@styles/theme';

export function PledgeDetail({ pledgeArr, slogan }: PromiseArr) {
  return (
    <Article>
      <PledgeBlock>
        <InnerBox>
          <SloganText>"{slogan}"</SloganText>
          <PledgeTable>
            {pledgeArr.map((pledge, index) => {
              return (
                <PledgeCard
                  key={index}
                  promiseType={pledge.promiseType}
                  promiseTitle={pledge.promiseTitle}
                  promiseDetail={pledge.promiseDetail}
                />
              );
            })}
          </PledgeTable>
        </InnerBox>
      </PledgeBlock>
    </Article>
  );
}

const Article = styled.article`
  width: ${media.laptop}px;
  height: 100%;
  margin: 0 auto;
  -ms-user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  -khtml-user-select: text;
  user-select: text;
  @media (max-width: ${media.mobileL}px) {
    width: 100%;
  }
`;

const PledgeBlock = styled.div`
  width: 90%;
  padding: 60px;
  padding-bottom: 90px;
  box-sizing: border-box;
  margin: 0 auto;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
  border-radius: 25px;
  background-color: white;
  @media (max-width: ${media.mobileL}px) {
    padding: 20px;
    width: 90%;
    min-width: 250px;
    height: 400px;
  }
`;

const InnerBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const SloganText = styled.h2`
  margin-bottom: 40px;
  text-align: center;
  font-size: 2.4rem;
  font-family: 'paybooc-extrabold', sans-serif;
  word-break: keep-all;
  color: ${theme.Blue};
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.8rem;
    margin: 30px auto;
  }
`;

const PledgeTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;
