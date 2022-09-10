import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import client from '@api/client';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { NoticeData } from './index';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';

interface FormProps {
  editData?: NoticeData;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
}

const DateOfToday = new Date().toString();

export default function NoticeForm(props: FormProps) {
  const { editData, setIsOpen, fetchData } = props;
  const classes = useStyles();
  const [id, setId] = useState<number | null>(null);
  const [content, setContent] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(DateOfToday);
  const [endDate, setEndDate] = useState<string>(DateOfToday);
  const [disabled, setDisabled] = useState<boolean>(false);
  const alert = useAlert();

  const handleContentInput = (e) => {
    setContent(e.target.value);
  };

  const handleStartDateInput = (date) => {
    setStartDate(date);
  };

  const handleEndDateInput = (date) => {
    setEndDate(date);
  };

  const onUpdate = () => {
    setDisabled(true);
    const result = {
      content,
      startDate,
      endDate,
    };
    client
      .patch(`/api/v1/admin/banner/${id}`, result)
      .then(() => {
        alert.success('수정 완료');
        setContent('');
        fetchData();
        if (setIsOpen) setIsOpen(false);
      })
      .catch((e) => alert.error('업데이트 실패'));
  };

  const submitForm = () => {
    setDisabled(true);
    const result = {
      content,
      startDate,
      endDate,
    };
    client
      .post('/api/v1/admin/banner', result)
      .then(() => {
        alert.success('배너 등록 완료');
        setContent('');
      })
      .catch((e) => alert.error('배너 등록 실패'))
      .then(() => {
        setDisabled(false);
        fetchData();
      });
  };

  useEffect(() => {
    if (!editData) return;
    setId(editData.id);
    setContent(editData.content);
    setStartDate(editData.startDate);
    setEndDate(editData.endDate);
    return () => {
      setId(null);
      setContent('');
      setStartDate(DateOfToday);
      setEndDate(DateOfToday);
    };
  }, [editData]);

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <form noValidate autoComplete="off">
            <Typography className={classes.title} variant="h4" component="h4">
              배너 입력
            </Typography>
            <TextField
              id="outlined-full-width"
              className={classes.input}
              placeholder="ex. 총학생회 선거 D-day입니다."
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ classes: { input: classes.resize } }}
              variant="outlined"
              value={content}
              onChange={handleContentInput}
            />
            <Typography className={classes.title} variant="h4" component="h4">
              선거 날짜
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="flex-start" className={classes.dateGrid}>
                <KeyboardDatePicker
                  className={classes.dateSelector}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="시작일"
                  InputProps={{ classes: { input: classes.resize } }}
                  value={startDate}
                  onChange={handleStartDateInput}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  className={classes.dateSelector}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-dialog"
                  label="종료일"
                  InputProps={{ classes: { input: classes.resize } }}
                  value={endDate}
                  onChange={handleEndDateInput}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid className={classes.buttonBlock}>
              <Button
                variant="contained"
                color="primary"
                className={classes.colorButton}
                onClick={editData ? onUpdate : submitForm}
                disabled={disabled}
              >
                {editData ? '수정' : '등록'}
              </Button>
            </Grid>
          </form>
        </div>
      </Paper>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
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
  input: {
    width: '100%',
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  colorButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
