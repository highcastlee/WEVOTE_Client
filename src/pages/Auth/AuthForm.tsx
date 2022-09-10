import { JAVASCRIPT_KEY, REDIRECT_URI } from '@constants/kakao_key';
import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { verifyEmail, verifyName, verifyPassword } from '@utils/getFunction';

import axios from 'axios';
import Button from '@components/Button';
import { FormType } from '@store/modules/authSlice';
import KakaoLogin from 'react-kakao-login';
import klogin from '@img/login/kakaoLogin.png';
import media from '@styles/media';
import React from 'react';
import theme from '@styles/theme';
import { useDispatch } from 'react-redux';
import userSlice from '@store/modules/userSlice';

interface AuthFormProps {
  type: string;
  form: FormType;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

interface styleProps {
  error?: boolean;
}

const textMap = {
  login: '로그인',
  register: '회원가입',
};

function AuthForm({ type, form, onChange, onSubmit }: AuthFormProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const text = textMap[type];
  const isRegister = type === 'register';

  const kakaoSuccess = (res) => {
    axios
      .get(`${REDIRECT_URI}`, {
        headers: {
          Authorization: res.response.access_token,
        },
      })
      .then((res) => {
        localStorage.setItem('Authorization', res.headers['Authorization']);
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch(userSlice.actions.tempSetUser({ user: res.data }));
        history.push('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const correctName = (form) => verifyName(form.nickName);
  const correctEmail = (form) => verifyEmail(form.userId);
  const correctPassword = (form) => verifyPassword(form.password);
  const correctPasswordConfirm = (form) =>
    form.password === form.passwordConfirm && form.password !== '';

  const preventSubmit = () => {
    if (isRegister) {
      if (
        correctEmail(form) &&
        correctPassword(form) &&
        correctPasswordConfirm(form) &&
        correctName(form)
      )
        return false;
      return true;
    }
    if (correctEmail(form) && correctPassword(form)) return false;
    return true;
  };

  return (
    <AuthFormBlock>
      <Title className="header">{text}</Title>
      {isRegister && (
        <Subtitle>
          {'게시판을 이용하기 위해 먼저 회원가입을 진행해주세요'}
        </Subtitle>
      )}
      <Form onSubmit={onSubmit}>
        {isRegister && (
          <>
            <StyledLabel>{'이름'}</StyledLabel>
            <StyledInput
              error={!correctName(form)}
              autoComplete="nickName"
              name="nickName"
              placeholder="2~20자리 한글 또는 영문"
              onChange={onChange}
              value={form.nickName}
            />
          </>
        )}
        <StyledLabel>{'이메일'}</StyledLabel>
        <StyledInput
          error={!correctEmail(form)}
          autoComplete="userId"
          name="userId"
          placeholder="ex) univote@vote.com"
          onChange={onChange}
          value={form.userId}
        />
        <StyledLabel>{'비밀번호'}</StyledLabel>
        <StyledInput
          error={!correctPassword(form)}
          autoComplete="password"
          name="password"
          placeholder="영문,숫자,특수문자를 포함한 6~12자리"
          type="password"
          onChange={onChange}
          value={form.password}
        />

        {isRegister && (
          <>
            <StyledLabel>{'비밀번호 확인'}</StyledLabel>
            <StyledInput
              error={!correctPasswordConfirm(form)}
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
          </>
        )}

        <ButtonBlock>
          <Button type="submit" disabled={preventSubmit()}>
            {text}
          </Button>
        </ButtonBlock>
        {!isRegister && (
          <APILoginBlock>
            <KakaoLogin
              token={JAVASCRIPT_KEY || ''}
              onSuccess={kakaoSuccess}
              onFail={console.error}
              onLogout={console.info}
              style={{
                border: 'none',
                backgroundColor: 'inherit',
                cursor: 'pointer',
              }}
            >
              <KakaoImg src={klogin} alt="klogin" />
            </KakaoLogin>
          </APILoginBlock>
        )}
      </Form>

      <Footer>
        {isRegister ? (
          <Link to="/login">{'로그인'}</Link>
        ) : (
          <Link to="/register">{'회원가입'}</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
}

const APILoginBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px 0;
`;

const KakaoImg = styled.img`
  &:hover {
    cursor: pointer;
  }
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  @media (max-width: ${media.mobileL}px) {
    width: 90%;
  }
`;

const AuthFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  @media (max-width: ${media.mobileL}px) {
    width: 100%;
  }
`;

const Form = styled.form`
  @media (max-width: ${media.mobileL}px) {
    width: 100%;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledLabel = styled.label`
  font-size: 1.3rem;
  color: #252c44;
  margin: 15px 5px;
  font-weight: bold;
`;

const StyledInput = styled.input<styleProps>`
  width: 97%;
  height: 54px;
  padding-left: 10px;
  border: 1px solid ${theme.Blue};
  border-radius: 15px;
  &:focus {
    border: 1px solid #1d1444;
    outline: none;
  }
  & + & {
    margin-top: 1rem;
  }
  ${(props) =>
    props.error &&
    css`
      border: 1px solid #c00404;
    `}
  @media (max-width: ${media.mobileL}px) {
    width: 94%;
    height: 40px;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  color: #252c44;
  margin: 20px auto;
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.6rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #252c44;
  text-align: center;
  margin: 10px auto;
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin: 20px 15px 20px 0px;
`;

const Footer = styled.div`
  margin: 40px auto;
  a {
    text-decoration: underline;
    font-size: 1.4rem;
    font-weight: bold;
    &:hover {
      color: ${theme.Blue};
    }
  }
`;

export default AuthForm;
