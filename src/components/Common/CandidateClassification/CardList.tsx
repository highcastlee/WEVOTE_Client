import * as React from 'react';

import styled, { css } from 'styled-components';

import CandidateCard from '@components/Common/CandidateCard';
import media from '@styles/media';
import { Team } from 'candidateType';
import theme from '@styles/theme';
import { useHistory } from 'react-router-dom';

interface imgTypes {
  isLink?: boolean;
  refetch?: () => void;
  dataArr: any[];
  title?: string;
  alt: string;
  description?: string;
  isCurrent?: boolean;
  organizationId?: number;
}

interface styleProps {
  isCurrent?: boolean;
  mobileMargin?: number;
  MobileBoxSize?: number;
  laptopMargin?: number;
}

const BoxSize = 360;
const MobileBoxSize = 80;

const CardList = (props: imgTypes) => {
  const {
    isLink,
    refetch,
    dataArr,
    title,
    alt,
    isCurrent,
    description,
    organizationId,
  } = props;
  const history = useHistory();

  const mobileMargin =
    (window.innerWidth - (window.innerWidth * MobileBoxSize) / 100) / 2;

  const routePledge = () => {
    history.push(`/promise/promise-detail/${organizationId}`);
  };

  return (
    <>
      {isLink
        ? dataArr.map((team: Team) => (
            <Box
              key={team.id}
              isCurrent={isCurrent}
              mobileMargin={mobileMargin}
              MobileBoxSize={MobileBoxSize}
              onClick={routePledge}
            >
              <CandidateCard title={title} teamData={team} refetch={refetch} />
            </Box>
          ))
        : dataArr.map((img, index) => (
            <Box
              key={index}
              mobileMargin={mobileMargin}
              MobileBoxSize={MobileBoxSize}
            >
              <Img src={img} alt={alt} />
              {description && <Description>{description}</Description>}
            </Box>
          ))}
    </>
  );
};

CardList.defaultProps = {
  isLink: false,
  isCurrent: true,
};

const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 20px ${theme.CardShadow}4d;
  border: 1px solid ${theme.CardDash};
  border-radius: 25px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: ${media.mobileL + 1}px) {
    margin: 20px 30px;
    min-width: ${BoxSize}px;
  }
  @media (max-width: ${media.mobileL}px) {
    margin: 20px 5vw 20px 2.5vw;
    max-width: ${(props: styleProps) => props.MobileBoxSize}vw;
    min-width: ${(props: styleProps) => props.MobileBoxSize}vw;
    flex: 1 0;
  }
  ${(props: styleProps) =>
    !props.isCurrent &&
    css`
      opacity: 0.5;
    `};
`;

const Img = styled.img`
  width: 100%;
  height: 90%;
`;

const Description = styled.p`
  font-family: 'pacbooc-medium', sans-serif;
  font-size: 1.8rem;
  text-align: center;
  color: ${theme.SoftPurple};
  @media (max-width: ${media.mobileL}px) {
    font-size: 1.4rem;
  }
`;

export default CardList;
