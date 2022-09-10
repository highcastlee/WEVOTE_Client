import * as TextData from '../TextData';

import { CandidateType, Team } from 'candidateType';
import React, { useEffect, useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { isEmptyArr } from '@utils/getFunction';
import Loader from '@components/Loader';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { TeamType } from '../Register';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useGetCategory from '@hooks/useGetCategory';
import { useStyles } from '../RegisterStyle';

interface TeamFormProps {
  setTeamData: React.Dispatch<React.SetStateAction<TeamType>>;
  editData: CandidateType | null;
}

export default function TeamForm(props: TeamFormProps) {
  const { setTeamData, editData } = props;
  const classes = useStyles();
  const {
    categoryState,
    topList,
    middleList,
    bottomList,
    setMiddleList,
    setBottomList,
    getNewMiddleList,
    getNewBottomList,
    hasBottom,
    currentIndex,
    setCurrentIndex,
  } = useGetCategory();
  // input 상태 관리
  const [slogan, setSlogan] = useState<string>('');
  const [currentTop, setCurrentTop] = useState<string>('');
  const [currentMiddle, setCurrentMiddle] = useState<string>('');
  const [currentBottom, setCurrentBottom] = useState<string>('');
  const [teamNumber, setTeamNumber] = useState<number>(1);

  const isCompleted =
    Boolean(slogan) &&
    Boolean(currentMiddle) &&
    Boolean((hasBottom && currentBottom) || !hasBottom) &&
    Boolean(teamNumber);

  // 후보 팀 공통 정보 등록
  const handleSlogan = (e) => {
    setSlogan(e.target.value);
  };

  const handleClassificationTop = (e) => {
    setCurrentTop(e.target.value);
    getNewMiddleList(e.target.value);
  };

  const handleClassificationMiddle = (e) => {
    setCurrentMiddle(e.target.value);
    getNewBottomList(e.target.value);
  };

  const handleClassificationBottom = (e) => {
    setCurrentBottom(e.target.value);
  };

  const handleTeamNumber = (e) => {
    setTeamNumber(e.target.value);
  };

  const overwriteEditData = () => {
    if (!editData) return;
    setSlogan(editData.slogan);
    setTeamNumber(editData.order);
    if (editData.majorName) setCurrentBottom(editData.majorName);

    const currentTopIndex = topList.indexOf(editData.categoryName);
    const midList = categoryState.data[currentTopIndex].middle.map(
      (mid) => mid.organizationName
    );
    const currentMidIndex = midList.indexOf(editData.categoryDetail);
    setMiddleList(midList);
    const botList = hasBottom
      ? categoryState.data[currentTopIndex].middle[currentMidIndex].Majors.map(
          (mid) => mid.organizationName
        )
      : [];
    const currentBotIndex = hasBottom ? botList.indexOf(editData.majorName) : 0;
    setBottomList(botList);
    setCurrentIndex({
      top: currentTopIndex,
      middle: currentMidIndex,
      bottom: currentBotIndex,
    });
  };

  const renderMenuItem = () => {
    const maxMenuCount = 6;
    const menuArr = Array.from({ length: maxMenuCount }, (_, i) => i + 1);
    return menuArr.map((m) => (
      <MenuItem key={m} value={m}>
        {m}
      </MenuItem>
    ));
  };

  useEffect(() => {
    setCurrentTop(topList[currentIndex.top]);
    setCurrentMiddle(middleList[currentIndex.middle]);
    if (hasBottom && editData) setCurrentBottom(editData.majorName);
  }, [currentIndex]);

  useEffect(() => {
    if (!editData) return;
    overwriteEditData();
  }, [editData, categoryState.data]);

  useEffect(() => {
    setCurrentTop(topList[0] || '');
    return () => setCurrentTop('');
  }, [topList]);

  useEffect(() => {
    if (!editData) setCurrentMiddle(middleList[0] || '');
    return () => setCurrentMiddle('');
  }, [middleList]);

  useEffect(() => {
    if (!editData) {
      setCurrentBottom(bottomList[0] || '');
    }
    return () => setCurrentBottom('');
  }, [bottomList]);

  useEffect(() => {
    if (isCompleted) {
      const teamData = {
        slogan,
        currentTop,
        currentMiddle,
        currentBottom,
        teamNumber,
      };
      setTeamData(teamData);
    }
  }, [slogan, currentMiddle, currentBottom, teamNumber]);

  return (
    <Grid container className={classes.section}>
      <Grid item className={classes.item}>
        <Typography className={classes.sectionText} variant="h4" component="h4">
          {TextData.sectionText.team}
        </Typography>
      </Grid>
      {categoryState.loading ? (
        <Grid item className={classes.loaderWrapper}>
          <Loader size={80} margin={20} />
        </Grid>
      ) : (
        <Grid container>
          <Grid container wrap="nowrap">
            <Grid item className={classes.gridInput}>
              <Typography
                className={classes.titleText}
                variant="h4"
                component="h4"
              >
                {TextData.titleText.candidate.classificationTop}
              </Typography>
              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  labelId="label"
                  id="select"
                  value={currentTop}
                  onChange={handleClassificationTop}
                >
                  {topList &&
                    topList.map((data, i) => (
                      <MenuItem key={i} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.gridInput}>
              <Typography
                className={classes.titleText}
                variant="h4"
                component="h4"
              >
                {TextData.titleText.candidate.classificationMiddle}
              </Typography>
              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  labelId="label2"
                  id="select2"
                  value={currentMiddle}
                  onChange={handleClassificationMiddle}
                >
                  {middleList &&
                    middleList.map((data, i) => (
                      <MenuItem key={i} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            {!isEmptyArr(bottomList) && (
              <Grid item className={classes.gridInput}>
                <Typography
                  className={classes.titleText}
                  variant="h4"
                  component="h4"
                >
                  {TextData.titleText.candidate.classificationBottom}
                </Typography>
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                >
                  <Select
                    labelId="label3"
                    id="select3"
                    value={currentBottom}
                    onChange={handleClassificationBottom}
                  >
                    {bottomList &&
                      bottomList.map((data, i) => (
                        <MenuItem key={i} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Grid container wrap="nowrap">
            <Grid item className={classes.gridInput}>
              <Typography
                className={classes.titleText}
                variant="h4"
                component="h4"
              >
                {TextData.titleText.slogan}
              </Typography>
              <TextField
                className={classes.textField}
                id="outlined-basic"
                placeholder="슬로건을 20자 내외로 입력하세요"
                variant="outlined"
                error={!slogan}
                value={slogan}
                onChange={handleSlogan}
              />
            </Grid>
            <Grid item className={classes.gridInput}>
              <Typography
                className={classes.titleText}
                variant="h4"
                component="h4"
              >
                {TextData.titleText.candidate.teamNumber}
              </Typography>
              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={teamNumber}
                  onChange={handleTeamNumber}
                >
                  {renderMenuItem()}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
