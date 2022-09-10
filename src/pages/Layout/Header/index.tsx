import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as React from 'react';

import styled, { css } from 'styled-components';

import { LoginMenu } from './LoginMenu';
import logoIcon from '@icon/logo.svg';
import media from '@styles/media';
import menuBackground from '@icon/background/menuBackground.svg';
import { NavLink } from 'react-router-dom';
import storeTypes from 'storeTypes';
import { TextMenu } from './TextMenu';
import theme from '@styles/theme';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

interface HeaderStyle {
  isActive: boolean;
}

const Header = () => {
  const { user } = useSelector((state: storeTypes.sliceState) => ({
    user: state.user.user,
  }));
  const [isActive, setIsActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const changeActiveMenu = () => setIsActive(!isActive);
  const hideSidebar = () => setIsActive(false);

  const loginText = user && `반갑습니다. ${user.nickName}님`;
  const logoutText = '더 많은 이용을 위해 로그인/회원가입을 진행해주세요';

  useEffect(() => {
    setIsLogin(Boolean(user));
  }, [user]);

  return (
    <HeaderBar isActive={isActive}>
      <MenuBar>
        <ImgLink exact to="/" onClick={hideSidebar}>
          <LogoImg />
        </ImgLink>
        <MenuBox isActive={isActive}>
          <LoginMenu isLogin={isLogin} changeActiveMenu={changeActiveMenu} />
          <Subtext>{isLogin ? loginText : logoutText}</Subtext>
          <TextMenuBlock changeActiveMenu={changeActiveMenu} />
        </MenuBox>
        <IconBox onClick={changeActiveMenu}>
          {isActive ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
        </IconBox>
      </MenuBar>
    </HeaderBar>
  );
};

const HeaderBar = styled.header`
  width: 100vw;
  height: 60px;
  background-color: ${theme.DarkBlue};
  z-index: 10;
  position: absolute;
  top: 0;
  overflow-x: hidden;
  ${(props: HeaderStyle) =>
    props.isActive &&
    css`
      position: fixed;
    `};
`;

const MenuBar = styled.nav`
  font-size: 3rem;
  color: white;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (min-width: ${media.mobileL + 1}px) {
    max-width: ${media.laptop}px;
    padding: 0 10px;
  }
  @media (max-width: ${media.mobileL}px) {
    width: 100%;
  }
`;

const MenuBox = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: #ffffff;
  font-weight: 500;
  @media (max-width: ${media.mobileL}px) {
    display: ${(props: HeaderStyle) => (props.isActive ? 'block' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 60px;
    z-index: 10;
    padding-top: calc(100% - 300px);
    background-color: white;
    background-image: url(${menuBackground});
    background-size: cover;
  }
`;

const Subtext = styled.p`
  display: none;
  @media (max-width: ${media.mobileL}px) {
    display: block;
    text-align: center;
    order: 2;
    margin-bottom: 10rem;
    font-size: 1.3rem;
    color: ${theme.DarkBlue};
  }
`;

const TextMenuBlock = styled(TextMenu)`
  order: 1;
  @media (max-width: ${media.mobileL}px) {
    order: 3;
  }
`;

const ImgLink = styled(NavLink)`
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const LogoImg = styled.img.attrs({
  src: logoIcon,
  alt: 'main logo',
})`
  width: 120px;
  @media (max-width: ${media.mobileL}px) {
    margin: 0 10px;
  }
`;

const IconBox = styled.button`
  @media (min-width: ${media.mobileL + 1}px) {
    display: none;
  }
  @media (max-width: ${media.mobileL}px) {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 16px;
    color: white;
    background-color: Transparent;
    -webkit-appearance: none;
    box-sizing: border-box;
    border: none;
    outline: none;
    cursor: pointer;
    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

export default Header;
