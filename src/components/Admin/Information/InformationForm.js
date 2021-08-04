import Button from '@material-ui/core/Button';
import client from '../../../lib/api/client';
import Grid from '@material-ui/core/Grid';
import imageCompression from 'browser-image-compression';
import ImageUploader from '../Common/ImageUploader';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { useAlert } from 'react-alert';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

function InformationForm (props) {
  const { classes, setUrl, confirmDeletion } = props;
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState(['']);
  const alert = useAlert();

  const processImage = async e => {
    const imageFiles = Object.values(e.target.files);
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    const compressedFiles = await Promise.all(
      imageFiles.map(file => {
        return imageCompression(file, options);
      })
    );
    setFiles(compressedFiles);
    setUrls(
      compressedFiles.map(file => {
        return URL.createObjectURL(file);
      })
    );
  };

  const resetImg = () => {
    setFiles([]);
    setUrls([]);
  };

  const submitImg = e => {
    e.preventDefault();
    const formData = new FormData();
    files.map(file => {
      formData.append('img', file);
    });
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    client
      .post('/api/v1/admin/info', formData, config)
      .then(response => {
        if (response.status !== 200) {
          alert.error('이미지 등록 실패');
          return;
        }
        resetImg();
        alert.success('이미지가 등록되었습니다');
      })
      .catch(e => {
        alert.error('이미지 등록 실패');
      })
      .then(() =>
        // 등록 직후 fetch 실행 시, 새로운 db가 적용 안 되는 이슈 해결법
        window.setTimeout(setUrl(new String('/api/v1/admin/info')), 2000)
      );
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <form onSubmit={submitImg}>
          <Grid item xs={12} className={classes.buttonWrap}>
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
          <Grid item xs={12} className={classes.buttonWrap}>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              type='button'
              onClick={() => confirmDeletion('all')}
            >
              {'전체 삭제'}
            </Button>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              type='submit'
            >
              {'등록'}
            </Button>
          </Grid>
        </form>
      </div>
    </Paper>
  );
}

const styles = theme => ({
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
});

InformationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InformationForm);
