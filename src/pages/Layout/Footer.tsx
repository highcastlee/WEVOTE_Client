import * as React from 'react';

import logo from '@icon/logoWhite.svg';
import media from '@styles/media';
import styled from 'styled-components';
import theme from '@styles/theme';

const footerText = {
  title: '대학 온라인 선거 정보 관리 서비스',
  eng: 'University Online Election Information and Management Service',
  email: 'wevote.manager@gmail.com',
};

const Footer = () => {
  return (
    <FooterSection>
      <Logo />
      <Text>{footerText.title}</Text>
      <Text>{footerText.eng}</Text>
      <Text>{footerText.email}</Text>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  width: 100vw;
  height: 300px;
  background-color: ${theme.DarkBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color: white;
  font-size: 1.3rem;
  margin: 5px 50px;
  text-align: center;
  line-height: 20px;
`;

const Space = styled.div`
  height: 20px;
`;

const Logo = styled.img.attrs({
  src: logo,
  alt: 'logo',
})`
  width: 110px;
  margin-bottom: 30px;
  @media (max-width: ${media.mobileL}px) {
    margin: 0 10px;
  }
`;

export default Footer;
