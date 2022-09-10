import * as TextData from '../TextData';

import React, { useEffect, useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import imageCompression from 'browser-image-compression';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../RegisterStyle';

interface IndividualProps {
  index: number;
  candidateMajor: string;
  candidateName: string;
  candidateStudentNum: number;
  candidatePosition: string;
  handleImageArr: (idx: number, value: string | ArrayBuffer | null) => void;
  handleUrlArr: (idx: number, value: string) => void;
  handleMajorArr: (idx: number, value: string) => void;
  handleNameArr: (idx: number, value: string) => void;
  handleStudentNumArr: (idx: number, value: number) => void;
  handlePositionArr: (idx: number, value: string) => void;
  majorData: string[];
  loading: boolean;
  url: string;
}

export default function IndividualCandidate(props: IndividualProps) {
  const {
    index,
    candidateMajor,
    candidateName,
    candidateStudentNum,
    candidatePosition,
    handleImageArr,
    handleUrlArr,
    handleMajorArr,
    handleNameArr,
    handleStudentNumArr,
    handlePositionArr,
    majorData,
    loading,
    url,
  } = props;
  const classes = useStyles();
  const [individualName, setIndividualName] = useState<string>('');
  const [individualMajor, setIndividualMajor] = useState<string>('');
  const [individualStudentNum, setIndividualStudentNum] = useState<number>(0);
  const [individualPosition, setIndividualPosition] = useState<string>('');

  const handleName = (e) => {
    setIndividualName(e.target.value);
    handleNameArr(index, e.target.value);
  };

  const handleStudentNumber = (e) => {
    setIndividualStudentNum(e.target.value);
    handleStudentNumArr(index, e.target.value);
  };

  const handleMajor = (e) => {
    setIndividualMajor(e.target.value);
    handleMajorArr(index, e.target.value);
  };

  const handlePosition = (e) => {
    setIndividualPosition(e.target.value);
    handlePositionArr(index, e.target.value);
  };
  const processImage = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    };

    imageCompression(imageFile, options).then((compressedFile) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        handleImageArr(index, base64data);
      };
    });

    handleUrlArr(index, imageUrl);
  };
  const resetImg = () => {
    handleUrlArr(index, '');
  };

  useEffect(() => {
    if (!candidateStudentNum) return;
    setIndividualMajor(candidateMajor);
    setIndividualName(candidateName);
    setIndividualPosition(candidatePosition);
    setIndividualStudentNum(candidateStudentNum);
  }, [candidateStudentNum]);

  return (
    <Grid container wrap="nowrap">
      <Grid item className={classes.item}>
        <Typography className={classes.titleText} variant="h4" component="h4">
          {TextData.titleText.candidate.image}
        </Typography>
        <ImageUploader
          alt={`candidate-${index}`}
          fileUrl={url}
          resetImg={resetImg}
          processImage={processImage}
          width={'200px'}
          height={'auto'}
        />
      </Grid>
      <Grid container>
        <Grid item className={classes.gridInput}>
          <Typography className={classes.titleText} variant="h4" component="h4">
            {TextData.titleText.candidate.name}
          </Typography>
          <TextField
            placeholder="ex) 홍길동"
            variant="outlined"
            error={!individualName}
            value={individualName}
            onChange={handleName}
          />
        </Grid>
        <Grid item className={classes.gridInput}>
          <Typography className={classes.titleText} variant="h4" component="h4">
            {TextData.titleText.candidate.studentNumber}
          </Typography>
          <TextField
            placeholder="ex) 21"
            variant="outlined"
            type="number"
            error={!individualStudentNum}
            value={individualStudentNum}
            onChange={handleStudentNumber}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item className={classes.gridInput}>
          <Typography className={classes.titleText} variant="h4" component="h4">
            {TextData.titleText.candidate.major}
          </Typography>
          <FormControl
            variant="outlined"
            required
            className={classes.formControl}
          >
            <Select
              labelId="demo-simple-select-outlined-label"
              error={!individualMajor}
              value={individualMajor}
              onChange={handleMajor}
            >
              {loading ? (
                <MenuItem value={'없음'}>{'없음'}</MenuItem>
              ) : (
                majorData &&
                majorData.map((data, i) => (
                  <MenuItem key={i} value={data}>
                    {data}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item className={classes.gridInput}>
          <Typography className={classes.titleText} variant="h4" component="h4">
            {TextData.titleText.candidate.position}
          </Typography>
          <TextField
            placeholder="ex) 정학생회장"
            variant="outlined"
            error={!individualPosition}
            value={individualPosition}
            onChange={handlePosition}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
