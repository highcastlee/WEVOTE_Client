import * as React from 'react';

import media from '@styles/media';
import { PromiseType } from 'candidateType';
import styled from 'styled-components';
import theme from '@styles/theme';

export function PledgeCard({
  promiseType,
  promiseTitle,
  promiseDetail,
}: PromiseType) {
  return (
    <CardBlock>
      <BarIcon>l</BarIcon>
      <TypeText>{promiseType}</TypeText>
      <TextBlock>
        <TitleText>{promiseTitle}</TitleText>
        <DetailText>- {promiseDetail}</DetailText>
      </TextBlock>
    </CardBlock>
  );
}

const CardBlock = styled.div`
  width: 290px;
  padding: 20px;
  margin-top: 20px;
`;

const BarIcon = styled.span`
  font-size: 2.8rem;
  font-weight: bold;
  color: ${theme.Blue};
  font-family: 'paybooc-extrabold', sans-serif;
  vertical-align: sub;
  margin-right: 10px;
`;

const TypeText = styled.h3`
  color: ${theme.Blue};
  display: inline-block;
  font-size: 2rem;
  font-family: 'paybooc-extrabold', sans-serif;
  margin-bottom: 10px;
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.6rem;
    font-family: 'paybooc-bold', sans-serif;
  }
`;

const TextBlock = styled.div`
  /* padding-left: 20px; */
`;

const TitleText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding-top: 20px;
  line-height: 25px;
  word-break: keep-all;
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.4rem;
  }
`;

const DetailText = styled.p`
  font-size: 1.5rem;
  padding-top: 20px;
  line-height: 30px;
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.4rem;
  }
`;
