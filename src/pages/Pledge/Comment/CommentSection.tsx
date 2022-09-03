import * as React from 'react';

import { CommentArticle } from './CommentArticle';
import { CommentInput } from './CommentInput';
import media from '@styles/media';
import { qnaInfo } from 'candidateType';
import styled from 'styled-components';

interface commentType {
  qnaArr: qnaInfo[];
  teamId: number;
  fetchData: () => void;
}

export function CommentSection({ qnaArr, teamId, fetchData }: commentType) {
  return (
    <Section>
      <CommentBlock>
        <CommentInput teamId={teamId} fetchData={fetchData} />
        <CommentArticle qnaArr={qnaArr} />
      </CommentBlock>
    </Section>
  );
}

const Section = styled.section`
  width: ${media.laptop}px;
  height: 100%;
  margin: 75px auto;
  margin-bottom: 100px;
  @media (max-width: ${media.mobileL}px) {
    width: 100%;
    margin: 40px auto;
    margin-bottom: 100px;
  }
`;

const CommentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0px auto;
  box-sizing: border-box;
  @media (min-width: ${media.mobileL + 1}px) {
    min-height: 600px;
  }
  @media (max-width: ${media.mobileL}px) {
    min-width: 250px;
    min-height: 300px;
  }
`;
