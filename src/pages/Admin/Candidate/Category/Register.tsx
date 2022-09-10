import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function Register({
  submitData,
  data,
  setPostData,
  currentIndex,
  setCurrentIndex,
  getNewMiddleList,
  getNewBottomList,
  handleBottomCurrentIndex,
  confirmDeletion,
  topList,
  middleList,
  bottomList,
  hasBottom,
}) {
  const classes = useStyles();
  const [middleValue, setMiddleValue] = useState<string>('');
  const [bottomValue, setBottomValue] = useState<string>('');

  const buttonText = '저장';

  const handleMiddleInputValue = (e) => {
    setMiddleValue(e.target.value);
  };

  const handleBottomInputValue = (e) => {
    setBottomValue(e.target.value);
  };

  const customList = (section, title, items, handle) => (
    <Card>
      <CardHeader className={classes.cardHeader} title={title} />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.length &&
          items.map((value, idx) => (
            <ListItem
              key={idx}
              role="listitem"
              button
              onClick={() => handle(value)}
              className={
                currentIndex[section] === idx ? classes.active : 'none'
              }
            >
              <ListItemText primary={`${value}`} />
              {currentIndex[section] === idx &&
                section !== 'top' &&
                !(hasBottom && section === 'middle') && (
                  <CloseIcon onClick={confirmDeletion(section, value)} />
                )}
            </ListItem>
          ))}
        <ListItem />
      </List>
    </Card>
  );
  useEffect(() => {
    getNewBottomList(middleList[0]);
    setCurrentIndex({ ...currentIndex, bottom: 0 });
  }, [topList, middleList]);

  useEffect(() => {
    let currentMiddle = middleValue;
    if (!middleValue && data[currentIndex.top].middle.length !== 0) {
      currentMiddle = middleList[currentIndex.middle];
    }
    setPostData({
      top: data[currentIndex.top].top,
      middle: currentMiddle,
      bottom: bottomValue,
    });
  }, [currentIndex.middle]);

  return (
    <form className={classes.contentWrapper} onSubmit={submitData}>
      <Grid container spacing={2} justify="center" className={classes.root}>
        <Grid item className={classes.card}>
          {customList('top', '대분류', topList, getNewMiddleList)}
        </Grid>
        <Grid item className={classes.card}>
          {customList('middle', '중분류', middleList, getNewBottomList)}
          {!hasBottom && (
            <Grid item className={classes.item}>
              <TextField
                id="outlined-basic"
                className={classes.inputText}
                placeholder="입력하세요."
                variant="outlined"
                autoFocus
                value={middleValue}
                onChange={(e) => handleMiddleInputValue(e)}
              />

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                {buttonText}
              </Button>
            </Grid>
          )}
        </Grid>
        {hasBottom && (
          <Grid item className={classes.card}>
            {customList(
              'bottom',
              '소분류',
              bottomList,
              handleBottomCurrentIndex
            )}
            <Divider />
            <Grid item className={classes.item}>
              <TextField
                id="outlined-basic"
                className={classes.inputText}
                placeholder="입력하세요."
                variant="outlined"
                autoFocus
                value={bottomValue}
                onChange={(e) => handleBottomInputValue(e)}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
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
  active: {
    backgroundColor: '#eae3ff',
  },
  item: {
    margin: '10px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputText: {
    width: '70%',
  },
  button: {
    width: '25%',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
  },
  contentWrapper: {
    margin: '40px 16px',
    display: 'flex',
    flexDirection: 'column',
  },
}));
