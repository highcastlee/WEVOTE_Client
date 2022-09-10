import * as React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { HasBottomType, HasMiddleType, Team } from 'candidateType';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Candidate from './Candidate';
import CandidateRegister from '@/pages/Admin/Candidate/Register/Register';
import Category from './Category';
import { Modal } from 'react-responsive-modal';
import Skeleton from '@material-ui/lab/Skeleton';
import storeTypes from 'storeTypes';
import toggleSlice from '@store/modules/toggleSlice';
import useFetch from '@hooks/useFetch';
import useGetCategory from '@hooks/useGetCategory';

const topCategory = {
  central: '중앙자치기구',
  college: '단과대',
  major: '학과',
};

const CandidateClassification = (props) => {
  const classes = useStyles();
  const {
    categoryState,
    currentIndex,
    topList,
    middleList,
    bottomList,
    hasBottom,
    getNewMiddleList,
    getNewBottomList,
    handleBottomCurrentIndex,
  } = useGetCategory();
  const [{ loading, data, error }, fetchData] = useFetch('/api/v1/main/all');
  const [organizationId, setOrganizationId] = useState<number>();
  const [teamData, setTeamData] = useState<Team[]>([]);
  const { toggleEditor, candidateId } = useSelector(
    ({ toggle }: storeTypes.sliceState) => ({
      toggleEditor: toggle.toggleEditor,
      candidateId: toggle.candidateId,
    })
  );
  const dispatch = useDispatch();

  // key에서 현재 index에 위치한 데이터셋을 가져온다
  const getCurrentDataSet = () => {
    const keys = Object.keys(topCategory);
    return data[keys[currentIndex.top]];
  };

  const handleMiddleTeamData = () => {
    const currentDataSet = getCurrentDataSet();
    currentDataSet.map((obj: HasMiddleType) => {
      if (obj.organizationName === middleList[currentIndex.middle]) {
        setOrganizationId(obj.id);
        setTeamData(obj.Teams);
        return false;
      }
    });
  };

  const handleBottomTeamData = () => {
    const currentDataSet = getCurrentDataSet();
    currentDataSet.map((obj: HasBottomType) => {
      if (obj.organizationName === middleList[currentIndex.middle]) {
        obj.Majors.map((obj2) => {
          if (obj2.organizationName === bottomList[currentIndex.bottom]) {
            setOrganizationId(obj2.id);
            setTeamData(obj2.Teams);
            return false;
          }
        });
        return false;
      }
    });
  };

  // Teams 데이터 출력
  useEffect(() => {
    if (!data) return;
    if (!hasBottom) {
      handleMiddleTeamData();
      return;
    }
    handleBottomTeamData();
    return () => handleBottomTeamData();
  }, [data, currentIndex]);
  return (
    <section>
      {categoryState.loading ? (
        <>
          <Skeleton
            animation="wave"
            variant="rect"
            className={classes.categoryTop}
          />
          <Skeleton
            animation="wave"
            variant="rect"
            className={classes.categoryMid}
          />
        </>
      ) : (
        <Category
          getNewMiddleList={getNewMiddleList}
          getNewBottomList={getNewBottomList}
          handleBottomCurrentIndex={handleBottomCurrentIndex}
          topList={topList}
          middleList={middleList}
          bottomList={bottomList}
          currentIndex={currentIndex}
        />
      )}
      <Candidate
        loading={loading}
        title={
          topList[currentIndex.top] === topCategory.major
            ? bottomList[currentIndex.bottom]
            : middleList[currentIndex.middle]
        }
        teamArr={teamData}
        organizationId={organizationId}
        refetch={fetchData}
      />
      <Modal
        open={toggleEditor}
        onClose={() => {
          dispatch(
            toggleSlice.actions.toggleCandidateEditor({
              toggleEditor: false,
              candidateId: candidateId,
            })
          );
        }}
        center
        classNames={{
          modal: 'modal-large',
        }}
      >
        <CandidateRegister refetch={fetchData} />
      </Modal>
    </section>
  );
};

export default CandidateClassification;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    categoryTop: {
      width: '100%',
      height: '60px',
      overflowX: 'hidden',
      backgroundColor: '#eee',
    },
    categoryMid: {
      width: '100%',
      height: '60px',
      overflowX: 'hidden',
    },
  })
);
