import * as React from 'react';

import client from '@api/client';
import media from '@styles/media';
import storeTypes from 'storeTypes';
import styled from 'styled-components';
import theme from '@styles/theme';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export function CommentInput({ teamId, fetchData }) {
  const [text, setText] = useState('');
  const alert = useAlert();
  const { user } = useSelector((state: storeTypes.sliceState) => ({
    user: state.user.user,
  }));

  const type = user?.status === 'admin' ? 'answer' : 'question';

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!user) {
      alert.info('로그인이 필요한 기능입니다.');
      return;
    }
    const result = {
      comment: text,
      teamId: teamId,
      type: type,
    };
    client
      .post('/api/v1/promise/promise-detail/qna', result)
      .then((res) => {
        fetchData();
        alert.success('QnA 등록 완료');
      })
      .catch((e) => alert.error('QnA 등록 실패'));
  };

  return (
    <InputForm onSubmit={submitComment}>
      <InputText
        type="text"
        value={text}
        placeholder="공약에 대한 질문을 남겨주세요."
        onChange={handleInputChange}
      />
      <InputButton type="submit" value="등록" />
    </InputForm>
  );
}

const InputForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 60px auto;
`;

const InputText = styled.input`
  height: 50px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid gray;
  border-radius: 15px;
  border-style: none;
  font-size: 1.5rem;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
  @media (min-width: ${media.mobileL + 1}px) {
    width: 85%;
  }
  @media (max-width: ${media.mobileL}px) {
    width: 70%;
    min-width: 200px;
    font-size: 1.2rem;
  }
`;

const InputButton = styled.input`
  width: 100px;
  height: 50px;
  margin-left: 10px;
  background: ${theme.Blue};
  border-radius: 25px;
  border-style: none;
  color: white;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: ${media.mobileL}px) {
    width: 64px;
    font-size: 1.2rem;
    border-radius: 15px;
  }
`;
