import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { theme } from '../materialStyle';
import Typography from '@material-ui/core/Typography';

export function PledgeBoard() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" align="center">
          {'PledgeBoard'}
        </Typography>
      </div>
    </Paper>
  );
}

const useStyles = makeStyles(() => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
}));
