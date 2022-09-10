import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import theme from '@styles/theme';
import { useState } from 'react';

interface AddFormProps {
  component: React.ReactNode;
}

export default function AddForm(props: AddFormProps) {
  const { component } = props;
  const classes = useStyles();
  const [isModal, setIsModal] = useState<boolean>(false);

  const showForm = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          {isModal ? (
            <>
              <RemoveCircleIcon
                className={classes.addIcon}
                onClick={showForm}
              />
              <h2 className={classes.title}>{'닫기'}</h2>
            </>
          ) : (
            <>
              <AddCircleIcon className={classes.addIcon} onClick={showForm} />
              <h2 className={classes.title}>{'추가하기'}</h2>
            </>
          )}
        </div>
      </Paper>
      {isModal && component}
    </>
  );
}

const useStyles = makeStyles(() => ({
  paper: {
    maxWidth: 936,
    margin: '20px auto',
    overflow: 'hidden',
    boxShadow: `0px 2px 13px rgba(42, 64, 139, 0.3)`,
    borderRadius: `15px`,
  },
  contentWrapper: {
    margin: '40px 16px',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.3rem',
    color: theme.Blue,
  },
  addIcon: {
    width: '42px',
    height: '42px',
    color: theme.Blue,
  },
}));
