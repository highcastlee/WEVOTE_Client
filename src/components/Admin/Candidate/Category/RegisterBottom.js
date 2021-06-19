import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

// 고정 분류 [중앙자치기구, 단과대, 학과] 선택창
// 고정 분류마다 중분류 입력 => [총학생회, 동아리연합회 등]
// 중분류마다 소분류 입력 => [문예창작학과 등] (미입력 가능)

const category = [
  {
    id: 3,
    top: '학과',
    middle: [
      { id: 1, organization: '인문대' },
      { id: 2, organization: '공과대' },
      { id: 3, organization: '정통대' },
      { id: 4, organization: '조형대' },
      { id: 5, organization: '기경대' },
    ],
    bottom: [
      {
        id: 1,
        organization: '인문대',
        major: ['문예창작학과', '행정학과', '영어영문학과'],
      },
      {
        id: 2,
        organization: '공과대',
        major: ['기계공학과', '전자정보공학과', '건축공학과'],
      },
      {
        id: 3,
        organization: '정통대',
        major: ['컴퓨터공학과', '전자미디어공학과'],
      },
    ],
  },
];

// const top = category.reduce((acc, cur) => {
//   acc.push(cur.top);
//   return acc;
// }, []);

// const initialMiddleArr = arr => {
//   const result = arr.reduce((acc, cur) => {
//     acc.push(cur.organization);
//     return acc;
//   }, []);
//   return result;
// };

export default function TransferList () {
  const classes = useStyles();
  const [current, setCurrent] = useState({ top: 0, middle: 0, bottom: 0 });
  const [topList, setTopList] = useState([]);
  const [middleList, setMiddleList] = useState([]);
  const [bottomList, setBottomList] = useState([]);

  const [middleValue, setMiddleValue] = useState('');
  const [bottomValue, setBottomValue] = useState('');

  const handleMiddleInputValue = e => {
    setMiddleValue(e.target.value);
  };

  const handleBottomInputValue = e => {
    setBottomValue(e.target.value);
  };

  const addMiddleCategory = () => {
    setMiddleList([...middleList, middleValue]);
    setMiddleValue('');
  };

  const addBottomCategory = () => {
    setBottomList([...bottomList, bottomValue]);
    setBottomValue('');
  };

  const onClickTop = value => () => {
    const currentTopIndex = topList.indexOf(value);
    const newMiddle = category[currentTopIndex].middle;
    const result = newMiddle.reduce((acc, cur) => {
      acc.push(cur.organization);
      return acc;
    }, []);
    setCurrent({ top: currentTopIndex, middle: 0, bottom: 0 });
    setMiddleList(result);
  };

  const onClickMiddle = value => () => {
    const currentMiddleIndex = middleList.indexOf(value);
    setCurrent({ ...current, middle: currentMiddleIndex, bottom: 0 });
    const bottomArr = category[current.top].bottom || [];
    const currentObj = bottomArr.filter(cur => cur.organization === value)[0];
    if (!currentObj) {
      setBottomList(new Array(0));
      return;
    }
    setBottomList(currentObj.major);
  };

  const onClickBottom = value => () => {
    const currentBottomIndex = bottomList.indexOf(value);
    setCurrent({ ...current, bottom: currentBottomIndex });
  };

  const submitData = e => {
    e.preventDefault();
    const data = {};

    fetch('https://localhost:8080/admin/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log('error:', error);
      });
  };

  useEffect(() => {
    setTopList(
      category.reduce((acc, cur) => {
        acc.push(cur.top);
        return acc;
      }, [])
    );
  }, [category]);

  useEffect(() => {
    onClickMiddle(middleList[0])();
    setCurrent({ ...current, bottom: 0 });
  }, [topList, middleList]);

  const customList = (section, title, items) => handle => (
    <Card>
      <CardHeader className={classes.cardHeader} title={title} />
      <Divider />
      <List className={classes.list} dense component='div' role='list'>
        {items &&
          items.map((value, index) => {
            const labelId = `label-${index}`;
            return (
              <ListItem
                key={index}
                role='listitem'
                button
                onClick={handle(value)}
                className={current[section] === index ? classes.active : 'none'}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItem>
            );
          })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <form className={classes.contentWrapper} onSubmit={submitData}>
      <Grid container spacing={2} justify='center' className={classes.root}>
        <Grid item className={classes.card}>
          {customList('top', '대분류', topList)(onClickTop)}
        </Grid>
        <Grid item className={classes.card}>
          {customList('middle', '중분류', middleList)(onClickMiddle)}
          <Grid item className={classes.item} xs={12}>
            <TextField
              id='outlined-basic'
              className={classes.inputText}
              placeholder='입력하세요.'
              variant='outlined'
              value={middleValue}
              onChange={handleMiddleInputValue}
            />
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={addMiddleCategory}
            >
              입력
            </Button>
          </Grid>
        </Grid>
        <Grid item className={classes.card}>
          {customList('bottom', '소분류', bottomList)(onClickBottom)}
          <Divider />
          <Grid item className={classes.item} xs={12}>
            <TextField
              id='outlined-basic'
              className={classes.inputText}
              placeholder='입력하세요.'
              variant='outlined'
              value={bottomValue}
              onChange={handleBottomInputValue}
            />
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={addBottomCategory}
            >
              입력
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.buttonWrap}>
        <Button
          className={classes.submit}
          variant='contained'
          color='primary'
          type='submit'
        >
          {'등록'}
        </Button>
      </Grid>
    </form>
  );
}

let theme = createMuiTheme({
  typography: {
    root: {
      fontSize: '1.4rem',
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiTypography: {
      body2: {
        fontSize: '1.3rem',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '1.3rem',
      },
    },
    MuiOutlinedInput: {
      root: {
        height: '40px',
      },
    },
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  card: {
    width: '30%',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    margin: '0 auto',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  item: {
    margin: '10px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  active: {
    backgroundColor: '#eae3ff',
  },
  inputText: {
    width: '70%',
  },
  button: {
    width: '25%',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    maxWidth: 936,
    margin: '30px auto',
    overflow: 'hidden',
    padding: '20px',
  },
  contentWrapper: {
    margin: '40px 16px',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonWrap: {
    width: '100%',
    textAlign: 'right',
    marginTop: '20px',
  },
  submit: {
    width: '100px',
    height: '40px',
    borderRadius: '15px',
    backgroundColor: theme.palette.primary.main,
  },
}));