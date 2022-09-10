import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import client from '@api/client';
import Grid from '@material-ui/core/Grid';
import imageCompression from 'browser-image-compression';
import ImageUploader from '@components/ImageUploader/ImageUploader';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useAlert } from 'react-alert';

interface FormProps {
  fetchData: () => void;
  confirmDeletion: (value: string) => void;
}

export default function InformationForm(props: FormProps) {
  const { fetchData, confirmDeletion } = props;
  const classes = useStyles();
  const [files, setFiles] = useState<File[] | string[]>(['']);
  const [urls, setUrls] = useState<string[]>(['']);
  const alert = useAlert();

  const processImage = async (e) => {
    const imageFiles: File[] = Object.values(e.target.files);
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    const compressedFiles = await Promise.all(
      imageFiles.map((file: File) => {
        return imageCompression(file, options);
      })
    );
    setFiles(compressedFiles);
    setUrls(
      compressedFiles.map((file) => {
        return URL.createObjectURL(file);
      })
    );
  };

  const resetImg = () => {
    setFiles(['']);
    setUrls(['']);
  };

  const submitImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.map((file) => {
      formData.append('img', file);
    });
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      await client
        .post('/api/v1/admin/info', formData, config)
        .then((response) => {
          if (response.status !== 200) {
            alert.error('이미지 등록 실패');
            throw new Error('image upload failure');
          }
          resetImg();
          alert.success('이미지가 등록되었습니다');
        })
        .then(() => fetchData())
        .catch((e) => {
          alert.error('이미지 등록 실패');
        });
    } catch (e) {
      alert.error('이미지 등록 실패');
    }
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <form onSubmit={submitImg}>
          <Grid item className={classes.buttonWrap}>
            <ImageUploader
              alt={'information'}
              fileUrl={urls}
              resetImg={resetImg}
              processImage={processImage}
              width={'250px'}
              height={'auto'}
              multiple
            />
          </Grid>
          <Grid item className={classes.buttonWrap}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="button"
              onClick={() => confirmDeletion('all')}
            >
              {'전체 삭제'}
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              {'등록'}
            </Button>
          </Grid>
        </form>
      </div>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  uploader: {
    width: '100%',
  },
  buttonWrap: {
    textAlign: 'right',
    margin: '40px 20px',
    height: '100%',
  },
  button: {
    width: '100px',
    height: '40px',
    borderRadius: '15px',
    margin: '0 10px',
  },
}));
