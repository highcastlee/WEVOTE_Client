import * as React from 'react';

import backgroundIcon from '@icon/background/backgroundIcon.svg';
import backgroundIcon2 from '@icon/background/backgroundIcon2.svg';
import Footer from './Footer';
import Header from './Header';
import media from '@styles/media';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <BackgroundBig src={backgroundIcon} alt="background image" />
    <BackgroundSmall src={backgroundIcon2} alt="background image" />
    <Main>{children}</Main>
    <Footer />
  </>
);

const Main = styled.main`
  width: 100vw;
  margin: 60px 0;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;

const BackgroundBig = styled.img`
  display: none;
  position: fixed;
  z-index: -1;
  top: -384px;
  left: -82px;
  width: 988px;
  @media (max-width: ${media.mobileL}px) {
    width: 584px;
    height: 584px;
    left: -296px;
    top: -168px;
  }
`;

const BackgroundSmall = styled.img`
  display: none;
  position: fixed;
  z-index: -1;
  width: 563px;
  height: 563px;
  left: 1226px;
  top: 683px;
  @media (max-width: ${media.mobileL}px) {
    width: 246px;
    height: 246px;
    left: 248px;
    top: 496px;
  }
`;

export default Layout;
