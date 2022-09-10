import ImagePreview from '@components/ImageUploader/ImagePreview';
import Loader from '@components/Loader';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';

interface ListProps {
  loading?: boolean;
  data?: any;
  error?: boolean;
  confirmDeletion: (value: string) => void;
}

export default function InformationList(props: ListProps) {
  const { loading, data, error, confirmDeletion } = props;
  const classes = useStyles();
  const title = '현재 안내 이미지';

  const showTeamCard = () => {
    if (!data) return;
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          data.map((obj, index) => (
            <FlexBlock key={index}>
              <ImagePreview
                alt={'information'}
                fileUrl={obj.image}
                width={'350px'}
                height={'auto'}
                resetImg={() => confirmDeletion(obj.id)}
              />
            </FlexBlock>
          ))
        )}
      </>
    );
  };

  return (
    <Paper className={classes.paper}>
      <Title>{title}</Title>
      <div className={classes.contentWrapper}>{showTeamCard()}</div>
    </Paper>
  );
}

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${theme.Blue};
  margin: 30px 0;
  text-align: center;
`;

const FlexBlock = styled.div`
  display: inline-block;
  text-align: end;
  margin: 20px;
`;

const useStyles = makeStyles(() => ({
  paper: {
    maxWidth: 936,
    margin: '30px auto',
    overflow: 'hidden',
    padding: '20px 0',
  },
  contentWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '40px 16px',
  },
  icon: {
    width: '30px',
    height: '30px',
    color: theme.Blue,
    '&:hover': {
      cursor: 'pointer',
      color: theme.DarkBlue,
    },
  },
}));
