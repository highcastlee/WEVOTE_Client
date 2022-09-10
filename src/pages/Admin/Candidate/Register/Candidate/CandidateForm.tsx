import * as TextData from '../TextData';

import { CandidateType, Runner } from 'candidateType';
import React, { useEffect, useState } from 'react';

import { getNewArrState } from '@utils/getFunction';
import Grid from '@material-ui/core/Grid';
import IndividualCandidate from './IndividualCandidate';
import Typography from '@material-ui/core/Typography';
import useFetch from '@hooks/useFetch';
import { useStyles } from '../RegisterStyle';

interface CandidateProps {
  handleCandidateData: (data: Runner[]) => void;
  editData: CandidateType | null;
}

// 팀당 후보 수(고정)
const candidateCount = 2;

const initialData: string[] = Array.from({ length: candidateCount }, (_) => '');

export default function CandidateForm({
  handleCandidateData,
  editData,
}: CandidateProps) {
  const classes = useStyles();
  const [{ loading, data, error }, fetchData] = useFetch('/api/v1/admin/major');
  // input 상태 관리
  const [imageArr, setImageArr] = useState<string[]>(initialData);
  const [urlArr, setUrlArr] = useState<string[]>(initialData);
  const [nameArr, setNameArr] = useState<string[]>(initialData);
  const [majorArr, setMajorArr] = useState<string[]>(initialData);
  const [studentNumArr, setStudentNumArr] = useState<number[]>([]);
  const [positionArr, setPositionArr] = useState<string[]>(initialData);

  // 후보 팀원 개별 정보 등록
  const handleImageArr = (index, value) => {
    getNewArrState(imageArr, index, value, setImageArr);
  };

  const handleUrlArr = (index, value) => {
    getNewArrState(urlArr, index, value, setUrlArr);
  };

  const handleNameArr = (index, value) => {
    getNewArrState(nameArr, index, value, setNameArr);
  };

  const handleStudentNumArr = (index, value) => {
    getNewArrState(studentNumArr, index, value, setStudentNumArr);
  };

  const handleMajorArr = (index, value) => {
    getNewArrState(majorArr, index, value, setMajorArr);
  };
  const handlePositionArr = (index, value) => {
    getNewArrState(positionArr, index, value, setPositionArr);
  };

  const overwriteEditData = () => {
    if (!editData) return;
    const positions: string[] = [];
    const majors: string[] = [];
    const studentNums: number[] = [];
    const urls: string[] = [];
    const names: string[] = [];
    editData.Runners.map((obj: Runner) => {
      positions.push(obj.position);
      majors.push(obj.major);
      studentNums.push(obj.studentNum);
      urls.push(obj.picture);
      names.push(obj.name);
    });

    setPositionArr(positions);
    setMajorArr(majors);
    setStudentNumArr(studentNums);
    setUrlArr(urls);
    setNameArr(names);
  };

  const isReady =
    nameArr[1] &&
    majorArr[1] &&
    studentNumArr[1] &&
    positionArr[1] &&
    imageArr[1];

  useEffect(() => {
    if (!editData) return;
    overwriteEditData();
    return () => overwriteEditData();
  }, [editData]);

  // //개별 input data를 pledgeData Array로 모으기
  useEffect(() => {
    if (!isReady) return;
    if (nameArr && majorArr && studentNumArr && positionArr && imageArr) {
      const candidateData = initialData.map((_, i) => ({
        name: nameArr[i],
        major: majorArr[i],
        studentNum: Number(studentNumArr[i]),
        position: positionArr[i],
        picture: imageArr[i],
      }));
      handleCandidateData(candidateData);
    }
  }, [nameArr, majorArr, studentNumArr, positionArr, imageArr]);

  const showCandidate = (index) => {
    return (
      <Grid container className={classes.section} key={index}>
        <Grid item className={classes.item}>
          <Typography
            className={classes.sectionText}
            variant="h4"
            component="h4"
          >
            {TextData.sectionText.candidate}
          </Typography>
        </Grid>
        <IndividualCandidate
          index={Number(index)}
          candidateMajor={majorArr[index]}
          candidateName={nameArr[index]}
          candidateStudentNum={studentNumArr[index]}
          candidatePosition={positionArr[index]}
          handleImageArr={handleImageArr}
          handleUrlArr={handleUrlArr}
          handleMajorArr={handleMajorArr}
          handleNameArr={handleNameArr}
          handleStudentNumArr={handleStudentNumArr}
          handlePositionArr={handlePositionArr}
          majorData={data}
          loading={loading}
          url={urlArr[index]}
        />
      </Grid>
    );
  };

  return <Grid container>{initialData.map((d, i) => showCandidate(i))}</Grid>;
}
