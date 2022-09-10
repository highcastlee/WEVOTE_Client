import { makeStyles, withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getFormatDate } from '@utils/getFunction';
import IconButton from '@material-ui/core/IconButton';
import Loader from '@components/Loader';
import { Modal } from 'react-responsive-modal';
import { NoticeData } from './index';
import NoticeForm from './NoticeForm';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface ListProps {
  loading: boolean;
  rows: NoticeData[];
  editData?: NoticeData;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
  onCloseModal: () => void;
  onUpdate: (id: number) => void;
  confirmDeletion: (id: number) => void;
}

export default function NoticeList(props: ListProps) {
  const {
    loading,
    rows,
    editData,
    isOpen,
    setIsOpen,
    fetchData,
    onCloseModal,
    onUpdate,
    confirmDeletion,
  } = props;
  const classes = useStyles();

  const showNoticeList = (data) => {
    return data.map((row) => (
      <StyledTableRow key={row.id}>
        <StyledTableCell>{row.content}</StyledTableCell>
        <StyledTableCell>
          {row.startDate
            ? getFormatDate(new Date(row.startDate))
            : row.startDate}
        </StyledTableCell>
        <StyledTableCell>
          {row.endDate ? getFormatDate(new Date(row.endDate)) : row.endDate}
        </StyledTableCell>
        <StyledTableCell>
          <IconButton aria-label="update" onClick={() => onUpdate(row.id)}>
            <EditIcon />
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>
          <IconButton
            aria-label="delete"
            onClick={() => confirmDeletion(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
    ));
  };

  return (
    <>
      {loading ? (
        <>
          <Loader size={50} />
        </>
      ) : (
        <TableContainer className={classes.root} component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className={classes.notice}>
                  공지사항
                </StyledTableCell>
                <StyledTableCell className={classes.start}>
                  시작일
                </StyledTableCell>
                <StyledTableCell className={classes.end}>
                  종료일
                </StyledTableCell>
                <StyledTableCell className={classes.button} />
                <StyledTableCell className={classes.button} />
              </TableRow>
            </TableHead>
            <TableBody>{rows && showNoticeList(rows)}</TableBody>
          </Table>
          <Modal
            open={isOpen}
            onClose={onCloseModal}
            center
            classNames={{
              modal: 'modal-small',
            }}
          >
            <NoticeForm
              editData={editData}
              setIsOpen={setIsOpen}
              fetchData={fetchData}
            />
          </Modal>
        </TableContainer>
      )}
    </>
  );
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: '98%',
    maxHeight: '100%',
    margin: '20px auto',
    boxShadow: `0px 2px 13px rgba(42, 64, 139, 0.3)`,
    borderRadius: `15px`,
  },
  table: {
    minWidth: 700,
  },
  notice: {
    minWidth: 400,
  },
  start: {
    minWidth: 150,
  },
  end: {
    minWidth: 150,
  },
  button: {
    minWidth: 50,
  },
  loading: {
    marginTop: '50px',
    marginLeft: '-100px',
    textAlign: 'center',
  },
});
