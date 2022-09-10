import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import Button from '@components/Button';
import closeIcon from '@icon/close.svg';
import Fab from '@material-ui/core/Fab';
import SearchBox from './SearchBox';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

interface SearchData {
  id: number;
  name: string;
}

const modalTitle = '검색하기';

export default function SearchModal({ data }: { data: SearchData[] }) {
  const classes = useStyles();
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ModalBox className={active ? classes.onModal : classes.offModal}>
          <IconArea onClick={handleActive}>
            <CloseIcon />
          </IconArea>
          <ModalTitle>{modalTitle}</ModalTitle>
          <SearchBox data={data} />
          <Recommendation>
            <Button
              bgColor={theme.palette.primary.main}
              color={theme.palette.primary.background}
            >
              총학
            </Button>
          </Recommendation>
        </ModalBox>
        <Fab
          onClick={handleActive}
          size="small"
          color="secondary"
          aria-label="add"
          className={active ? classes.onButton : classes.offButton}
        >
          <SearchIcon />
        </Fab>
      </ThemeProvider>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  onButton: {
    display: 'none',
  },
  offButton: {
    position: 'fixed',
    top: '94px',
    right: '14px',
    zIndex: 1,
    margin: theme.spacing(1),
  },
  onModal: {
    display: 'flex',
  },
  offModal: {
    display: 'none',
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiFab: {
      root: {
        boxShadow: '0px 0px 4px 4px rgba(93, 63, 232, 0.25)',
      },
      secondary: {
        color: '#5D3FE8',
        backgroundColor: 'white',
      },
    },
    MuiSvgIcon: {
      root: {
        fill: '#5D3FE8',
        width: '22px',
        height: '22px',
      },
    },
  },
});

const Recommendation = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
`;

const ModalBox = styled.div`
  padding-top: 25px;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1;
  top: 30%;
  left: 10%;
  width: 80%;
  height: 300px;
  background-color: #e8e2ff;
  border-radius: 20px;
  overflow: hidden;
`;

const IconArea = styled.div`
  position: absolute;
  right: 18px;
  top: 18px;
  width: 22px;
  height: 22px;
`;
const CloseIcon = styled.img.attrs({
  src: closeIcon,
  alt: 'close icon',
})`
  width: 100%;
`;
