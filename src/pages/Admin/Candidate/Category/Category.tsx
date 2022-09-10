import React, { useEffect, useState } from 'react';

import client from '@api/client';
import Loader from '@components/Loader';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Register from './Register';
import { useAlert } from 'react-alert';
import useGetCategory from '@hooks/useGetCategory';

interface indexType {
  top: number;
  middle: number;
  bottom: number;
}

interface postDataType {
  top: string;
  middle: string;
  bottom: string;
}

const initialIndex = {
  top: 0,
  middle: 0,
  bottom: 0,
};

const requestTopNames = ['central', 'college', 'major'];

export default function Category() {
  const classes = useStyles();
  const [categoryIndex, setCategoryIndex] = useState<indexType>(initialIndex);
  const {
    categoryState,
    fetchData,
    currentIndex,
    setCurrentIndex,
    topList,
    middleList,
    setMiddleList,
    bottomList,
    setBottomList,
    getNewMiddleList,
    getNewBottomList,
    handleBottomCurrentIndex,
    hasBottom,
  } = useGetCategory();
  const [postData, setPostData] = useState<postDataType>({
    top: '',
    middle: '',
    bottom: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(categoryState.loading);
  const alert = useAlert();

  const confirmDeletion = (section, value) => () => {
    if (window.confirm(`[${value}]의 모든 데이터를 삭제하시겠습니까?`))
      onDelete(section);
  };

  const deleteItem = (section) => {
    const deleteIndex = currentIndex[section] > 0 ? currentIndex[section] : 0;
    const nextIndex = deleteIndex - 1 >= 0 ? deleteIndex - 1 : 0;

    if (section === 'middle') {
      const newMiddleList = middleList.filter((m, i) => i !== deleteIndex);
      setMiddleList(newMiddleList);
      getNewBottomList(newMiddleList[0]);
    } else if (section === 'bottom') {
      setBottomList(bottomList.filter((b, i) => i !== deleteIndex));
    }
    setCurrentIndex({
      ...currentIndex,
      [section]: nextIndex,
    });
    setCategoryIndex({
      ...currentIndex,
      [section]: nextIndex,
    });
  };

  const requestDelete = async (section, top, id) => {
    setIsLoading(true);
    await client
      .delete(`/api/v1/admin/category/${top}/${id}`)
      .then((response) => {
        if (response.status === 200) alert.success('카테고리 삭제 완료');
        else alert.error('데이터 삭제 실패');
        deleteItem(section);
      })
      .catch((e) => {
        alert.error('데이터 삭제 실패');
      });
    fetchData();
  };

  const onDelete = (section) => {
    const value = { top: requestTopNames[currentIndex.top], id: 0 };
    const currentMiddleData =
      categoryState.data[currentIndex.top].middle[currentIndex.middle];

    if (section === 'middle') {
      value.id = currentMiddleData.id;
    } else if (section === 'bottom') {
      value.id = currentMiddleData.Majors[currentIndex.bottom].id;
    }
    requestDelete(section, value.top, value.id);
  };

  const requestPost = (data) => {
    if (hasBottom) {
      setBottomList([...bottomList, data.bottom]);
    } else {
      setMiddleList([...middleList, data.middle]);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!hasBottom) postData.bottom = '';
    await client
      .post('/api/v1/admin/category', postData)
      .then((response) => {
        if (response.status === 200) alert.success('카테고리 등록 완료');
        else alert.error('데이터 등록 실패');
        requestPost(postData);
      })
      .then(() => fetchData())
      .catch((e) => {
        alert.error('데이터를 등록할 수 없습니다.');
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentIndex === initialIndex) {
      setCurrentIndex({ ...categoryIndex });
    } else {
      setCategoryIndex({ ...currentIndex });
    }
    return () => setCurrentIndex(initialIndex);
  }, []);

  useEffect(() => {
    if (!categoryState.loading) setIsLoading(false);
    return () => setIsLoading(false);
  }, [categoryState.loading]);

  return (
    <Paper className={classes.paper}>
      {isLoading ? (
        <Loader />
      ) : (
        <Register
          data={categoryState.data}
          getNewMiddleList={getNewMiddleList}
          getNewBottomList={getNewBottomList}
          handleBottomCurrentIndex={handleBottomCurrentIndex}
          topList={topList}
          middleList={middleList}
          bottomList={bottomList}
          setPostData={setPostData}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          confirmDeletion={confirmDeletion}
          submitData={submitData}
          hasBottom={hasBottom}
        />
      )}
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 936,
    margin: '30px auto',
    overflow: 'hidden',
    padding: '20px',
  },
}));
