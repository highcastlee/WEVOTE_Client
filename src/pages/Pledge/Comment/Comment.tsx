import * as React from 'react';

import styled, { css } from 'styled-components';

import adminProfile from '@icon/profile/AdminProfile.svg';
import media from '@styles/media';
import { qnaInfo } from 'candidateType';
import theme from '@styles/theme';
import userProfile from '@icon/profile/UserProfile.svg';

interface styleProps {
  answer?: boolean;
}

interface qnaType {
  qna: qnaInfo;
  answer?: boolean;
}

export function Comment({ qna, answer }: qnaType) {
  const image = answer ? adminProfile : userProfile;
  const name = qna.type === 'question' ? '크루원' : '후보자';
  return (
    <QuestionBlock answer={answer}>
      <ProfileImg src={image} />
      <User answer={answer}>
        <UserName>{name}</UserName>
        <CommentDate>{qna.time}</CommentDate>
        <CommentTextBlock answer={answer}>
          <CommentText>{qna.comment}</CommentText>
        </CommentTextBlock>
      </User>
    </QuestionBlock>
  );
}

Comment.defaultProps = {
  answer: false,
};

const QuestionBlock = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  align-items: flex-start;
  ${(props: styleProps) =>
    props.answer &&
    css`
      flex-flow: row-reverse;
    `};
  @media (max-width: ${media.mobileL}px) {
    align-items: flex-start;
  }
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  @media (max-width: ${media.mobileL}px) {
    width: 50px;
    height: 50px;
  }
`;

const User = styled.div`
  width: 100%;
  padding: 0 18px;
  display: flex;
  flex-direction: column;
  ${(props: styleProps) =>
    props.answer &&
    css`
      align-items: flex-end;
      color: ${theme.Blue};
    `};
  @media (max-width: ${media.mobileL}px) {
    padding: 0 5px;
  }
`;

const UserName = styled.p`
  font-size: 1.5rem;
  font-family: 'paybooc-medium', sans-serif;
  font-weight: bold;
  margin-bottom: 10px;
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
`;

const CommentDate = styled.p`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: ${theme.Gray};
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
`;

const CommentTextBlock = styled.div`
  max-width: 800px;
  line-height: 25px;
  height: 100%;
  padding: 20px 30px;
  width: max-content;
  border-radius: 30px;
  background-color: ${theme.LightGray};
  display: flex;
  align-items: center;
  ${(props: styleProps) =>
    props.answer &&
    css`
      background-color: ${theme.AnswerBackground};
      color: black;
    `};
  @media (max-width: ${media.mobileL}px) {
    padding: 10px 25px;
    max-width: 180px;
  }
`;

const CommentText = styled.p`
  font-size: 1.4rem;
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.2rem;
  }
`;
