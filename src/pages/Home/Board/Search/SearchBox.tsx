import {
  createMuiTheme,
  createStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import React, { useState } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import media from '@styles/media';
import Popper from '@material-ui/core/Popper';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';

const defaultText = '선거명을 입력하세요';

function AutoBox({ history, data }: any) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState<string>('');

  // AutoComplete의 onChange 매개변수는 event, value, reason, detail 등으로 구성되어있음
  const selectSearchValue = (e, value) => {
    setSearchValue(value);
  };

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const selectWidth = () => {
    if (screen.width <= media.mobileL) return '90%';
    return 436;
  };

  const enterKey = (e) => {
    if (e.key === 'Enter') {
      goLink();
    }
  };

  const goLink = () => {
    const searchData = data.filter((obj) => obj.name == searchValue)[0];
    if (searchData) {
      history.push(`/promise/promise-detail/${searchData.id}`);
    } else {
      alert('검색된 선거 정보가 없습니다');
    }
  };

  const CustomPopper = function (props) {
    return <Popper {...props} className={classes.root} placement="bottom" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchBlock style={{ width: selectWidth() }}>
        <Autocomplete
          freeSolo
          id="custom-autocomplete"
          options={data.map((option) => option.name)}
          onChange={selectSearchValue}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                variant="outlined"
                placeholder={defaultText}
                value={searchValue}
                onChange={handleSearchValue}
                onKeyPress={enterKey}
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            );
          }}
          renderOption={(option) => {
            return (
              <h4 onClick={() => setSearchValue(option)}>{`${option}`}</h4>
            ); // display value
          }}
          PopperComponent={CustomPopper} // required (as far as I can tell) in order to target popper elements for custom styling
        />
        <IconBlock onClick={goLink}>
          <Icon />
        </IconBlock>
      </SearchBlock>
    </ThemeProvider>
  );
}

export default withRouter(AutoBox);

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiAutocomplete-listbox': {
        fontSize: '1.4rem',
      },
      zIndex: 10,
    },
  })
);

const theme = createMuiTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        fill: '#5D3FE8',
        width: '24px',
        height: '24px',
      },
    },
    MuiInputBase: {
      input: {
        backgroundColor: '#FFFFFF',
        fontSize: '1.3rem',
        '&::-webkit-search-cancel-button': {
          display: 'none',
        },
        '&::-webkit-search-results-button': {
          display: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: '#FFFFFF',
        borderRadius: '200px',
      },
    },
  },
});

const SearchBlock = styled.div`
  position: relative;
  margin-top: 20px;
  @media (max-width: ${media.mobileL}px) {
    margin: 20px auto;
  }
`;

const IconBlock = styled.div`
  position: absolute;
  display: flex;
  right: 9px;
  top: 12px;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled(SearchIcon)``;
