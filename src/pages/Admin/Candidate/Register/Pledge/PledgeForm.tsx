import * as TextData from '../TextData';

import { CandidateType, PromiseType } from 'candidateType';
import React, { useEffect, useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IndividualPledge from './IndividualPledge';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../RegisterStyle';

interface PledgeFormProps {
  handlePledgeData: (data: PromiseType[]) => void;
  editData: CandidateType | null;
}

const MaxPledgeCount = 10;
const countArr: number[] = Array.from({ length: MaxPledgeCount }, (v, i) => i);

export default function PledgeForm(props: PledgeFormProps) {
  const { handlePledgeData, editData } = props;
  const classes = useStyles();
  const [pledgeCount, setPledgeCount] = useState<number>(1);
  const [pledgeCountArr, setPledgeCountArr] = useState<number[]>(
    Array(pledgeCount)
  );
  const [titleArr, setTitleArr] = useState<string[]>(Array(pledgeCount));
  const [subTitleArr, setSubTitleArr] = useState<string[]>(Array(pledgeCount));
  const [descriptionArr, setDescriptionArr] = useState<string[]>(
    Array(pledgeCount)
  );

  const handlePledgeCount = (e) => {
    setPledgeCount(e.target.value);
  };

  const handleTitleArr = (idx, value) => {
    const newTitleArr = titleArr.slice();
    newTitleArr[idx] = value;
    setTitleArr(newTitleArr);
  };

  const handleSubTitleArr = (idx, value) => {
    const newSubTitleArr = subTitleArr.slice();
    newSubTitleArr[idx] = value;
    setSubTitleArr(newSubTitleArr);
  };

  const handleDescriptionArr = (idx, value) => {
    const newDescriptionArr = descriptionArr.slice();
    newDescriptionArr[idx] = value;
    setDescriptionArr(newDescriptionArr);
  };

  const pledgeCountMenu = (idx) => (
    <MenuItem key={idx} value={idx}>
      {idx}
    </MenuItem>
  );

  // 배열로 업데이트한 값을 individual에서 받도록 수정해야함
  const overwriteEditData = () => {
    if (!editData) return;
    const titles: string[] = [];
    const subTitles: string[] = [];
    const descriptions: string[] = [];
    editData.Promises.map((promise: PromiseType) => {
      titles.push(promise.promiseTitle);
      subTitles.push(promise.promiseType);
      descriptions.push(promise.promiseDetail);
    });
    setPledgeCount(editData.Promises.length);
    setTitleArr(titles);
    setSubTitleArr(subTitles);
    setDescriptionArr(descriptions);
  };

  useEffect(() => {
    if (!editData) return;
    overwriteEditData();
  }, [editData]);

  useEffect(() => {
    const tempArr = Array.from({ length: pledgeCount }, (v, i) => i);
    setPledgeCountArr(tempArr);
    return () => setPledgeCountArr(tempArr);
  }, [pledgeCount]);

  // 개별 input data를 pledgeData Array로 모으기
  useEffect(() => {
    const pledgeData = pledgeCountArr.map((i) => ({
      promiseOrder: i + 1,
      promiseType: titleArr[i],
      promiseTitle: subTitleArr[i],
      promiseDetail: descriptionArr[i],
    }));
    handlePledgeData(pledgeData);
    return () => handlePledgeData(pledgeData);
  }, [titleArr, subTitleArr, descriptionArr]);

  return (
    <Grid container className={classes.section}>
      <Grid item className={classes.item}>
        <Typography className={classes.sectionText} variant="h4" component="h4">
          {TextData.sectionText.pledge}
        </Typography>
      </Grid>
      <Grid container>
        <Grid item className={classes.item}>
          <Typography className={classes.titleText} variant="h4" component="h4">
            {TextData.titleText.pledge.Number}
          </Typography>
          <FormControl
            required
            variant="outlined"
            className={classes.formControl}
          >
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={pledgeCount || 1}
              onChange={handlePledgeCount}
            >
              {countArr.map((idx) => pledgeCountMenu(idx))}
            </Select>
          </FormControl>
        </Grid>
        {pledgeCountArr.map((idx) => (
          <IndividualPledge
            key={idx}
            index={idx}
            editTitle={titleArr[idx]}
            editSubTitle={subTitleArr[idx]}
            editDescription={descriptionArr[idx]}
            handleTitleArr={handleTitleArr}
            handleSubTitleArr={handleSubTitleArr}
            handleDescriptionArr={handleDescriptionArr}
          />
        ))}
      </Grid>
    </Grid>
  );
}
