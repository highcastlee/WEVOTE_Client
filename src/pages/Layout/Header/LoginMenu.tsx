import * as React from 'react';

import loginIcon from '@icon/login/login.svg';
import { logout } from '@api/auth';
import logoutIcon from '@icon/login/logout.svg';
import media from '@styles/media';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '@styles/theme';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import userSlice from '@store/modules/userSlice';

interface LoginMenuProps {
  changeActiveMenu: () => void;
  isLogin: boolean;
}

export const LoginMenu = ({
  changeActiveMenu,
  isLogin = false,
}: LoginMenuProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    dispatch(userSlice.actions.logout());
    history.push('/');
  };

  const routeLoginForm = () => {
    history.push('/login');
  };

  return (
    <>
      <MenuItem onClick={changeActiveMenu}>
        {isLogin ? (
          <LoginImg onClick={handleLogout} />
        ) : (
          <LogoutImg onClick={routeLoginForm} />
        )}
      </MenuItem>
    </>
  );
};

LoginMenu.propTypes = {
  changeActiveMenu: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

const MenuItem = styled.li`
  order: 4;
  flex: 1;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: ${media.mobileL}px) {
    margin-bottom: 2rem;
    height: 70px;
    width: 100%;
    flex: none;
    order: 1;
  }
`;

const LoginImg = styled.img.attrs({
  src: loginIcon,
  alt: 'icon',
})`
  border-radius: 30px;
  box-shadow: 0px 2px 4px ${theme.Blue};
  @media (max-width: ${media.mobileL}px) {
    height: 38px;
  }
`;

const LogoutImg = styled.img.attrs({
  src: logoutIcon,
  alt: 'licon',
})`
  border-radius: 30px;
  box-shadow: 0px 2px 4px ${theme.DarkBlue};
  @media (max-width: ${media.mobileL}px) {
    height: 38px;
  }
`;
