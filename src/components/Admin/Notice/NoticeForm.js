import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  withStyles,
} from '@material-ui/core/styles';

const styles = createStyles({
  paper: {
    maxWidth: 936,
    margin: '20px auto',
    overflow: 'hidden',
    boxShadow: `0px 2px 13px rgba(42, 64, 139, 0.3)`,
    borderRadius: `15px`,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  title: {
    marginTop: '20px',
    marginBottom: '10px',
    marginLeft: '10px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  dateGrid: {
    marginLeft: '20px',
  },
  dateSelector: {
    marginRight: '20px',
  },
  resize: {
    fontSize: '14px',
  },
});

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))(Button);

const ButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function NoticeForm (props) {
  const { classes } = props;
  const [notice, setNotice] = useState('');
  const [startDate, setStartDate] = useState(new Date('2021-11-14T21:11:54'));
  const [endDate, setEndDate] = useState(new Date('2021-11-19T21:11:54'));

  const handleInputText = e => {
    setNotice(e.target.value);
  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const submitForm = () => {
    console.log(notice, startDate, endDate);
    fetch('https://localhost:8080/admin/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: notice,
        startDate: startDate,
        endDate: endDate,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setNotice('');
        console.log(data);
      })
      .catch(error => {
        setNotice('');
        console.log('error:', error);
      });
  };

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <form className={classes.root} noValidate autoComplete='off'>
            <Typography className={classes.title} variant='h4' component='h4'>
              배너 입력
            </Typography>
            <TextField
              id='outlined-full-width'
              style={{ margin: 8 }}
              placeholder='ex. 총학생회 선거 D-day입니다.'
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ classes: { input: classes.resize } }}
              variant='outlined'
              value={notice}
              onChange={handleInputText}
            />
            <Typography className={classes.title} variant='h4' component='h4'>
              선거 날짜
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='flex-start' className={classes.dateGrid}>
                <KeyboardDatePicker
                  className={classes.dateSelector}
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='시작일'
                  InputProps={{ classes: { input: classes.resize } }}
                  value={startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  className={classes.dateSelector}
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-dialog'
                  label='종료일'
                  format='MM/dd/yyyy'
                  InputProps={{ classes: { input: classes.resize } }}
                  value={endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <ButtonBlock>
              <ColorButton
                variant='contained'
                color='primary'
                className={classes.margin}
                onClick={submitForm}
              >
                등록하기
              </ColorButton>
            </ButtonBlock>
          </form>
        </div>
      </Paper>
    </>
  );
}

NoticeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoticeForm);
