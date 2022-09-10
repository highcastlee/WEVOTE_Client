import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthForm from './AuthForm';
import authSlice from '@store/modules/authSlice';
import { login } from '@api/auth';
import media from '@styles/media';
import storeTypes from 'storeTypes';
import styled from 'styled-components';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import userSlice from '@store/modules/userSlice';

export function Login() {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }: storeTypes.sliceState) => ({
    form: auth.login,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      authSlice.actions.changeField({
        form: 'login',
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form) return;
    try {
      const { nickName, status, userId } = await login({
        userId: form.userId,
        password: form.password,
      });
      dispatch(
        userSlice.actions.tempSetUser({ user: { nickName, status, userId } })
      );
      if (status === 'admin') history.push('/admin');
      else history.push('/');
    } catch {
      alert.error('로그인 실패');
    }
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(authSlice.actions.initializeForm('login'));
  }, [dispatch]);

  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <AuthForm
          type="login"
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </WhiteBox>
    </AuthTemplateBlock>
  );
}

const AuthTemplateBlock = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 160px auto 100px;
  @media (max-width: ${media.mobileL}px) {
    width: 90%;
  }
`;

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  width: 100%;
  height: 100%;
`;
