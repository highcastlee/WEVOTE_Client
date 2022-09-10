import * as TextData from '../TextData';

import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../RegisterStyle';

interface IndividualPledgeProps {
  index: number;
  editTitle: string;
  editSubTitle: string;
  editDescription: string;
  handleTitleArr: (idx: number, value: string) => void;
  handleSubTitleArr: (idx: number, value: string) => void;
  handleDescriptionArr: (idx: number, value: string) => void;
}

export default function IndividualPledge(props: IndividualPledgeProps) {
  const {
    index,
    editTitle,
    editSubTitle,
    editDescription,
    handleTitleArr,
    handleSubTitleArr,
    handleDescriptionArr,
  } = props;
  const classes = useStyles();
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSubTitle = (e) => {
    setSubTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (!(title && subTitle && description)) return;
    handleTitleArr(index, title);
    handleSubTitleArr(index, subTitle);
    handleDescriptionArr(index, description);
    return () => {
      handleTitleArr(index, title);
      handleSubTitleArr(index, subTitle);
      handleDescriptionArr(index, description);
    };
  }, [title, subTitle, description]);

  useEffect(() => {
    if (editTitle) setTitle(editTitle);
    if (editSubTitle) setSubTitle(editSubTitle);
    if (editDescription) setDescription(editDescription);
    return () => {
      setTitle(editTitle);
      setSubTitle(editSubTitle);
      setDescription(editDescription);
    };
  }, [editTitle, editSubTitle, editDescription]);

  return (
    <>
      <Grid container wrap="nowrap">
        <Grid item className={classes.item}>
          <Typography className={classes.titleText} variant="h4" component="h4">
            {TextData.titleText.pledge.title}
          </Typography>
          <TextField
            className={classes.textField}
            placeholder="공약 제목을 입력하세요"
            margin="normal"
            error={!title}
            value={title}
            onChange={handleTitle}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item className={classes.item}>
          <Typography className={classes.titleText} variant="h4" component="h4">
            {TextData.titleText.pledge.smallTitle}
          </Typography>
          <TextField
            className={classes.textField}
            placeholder="공약 소제목을 입력하세요"
            margin="normal"
            error={!subTitle}
            value={subTitle}
            onChange={handleSubTitle}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid item className={classes.item}>
        <Typography className={classes.titleText} variant="h4" component="h4">
          {TextData.titleText.pledge.description}
        </Typography>
        <TextField
          placeholder="공약 내용을 입력하세요"
          multiline
          fullWidth
          rows={8}
          error={!description}
          value={description}
          onChange={handleDescription}
          variant="outlined"
        />
      </Grid>
    </>
  );
}
