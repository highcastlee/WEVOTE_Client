import { useEffect, useState } from 'react';

import useFetch from './useFetch';

const initialIndex = { top: 0, middle: 0, bottom: 0 };

interface indexType {
  top: number;
  middle: number;
  bottom: number;
}

const useGetCategory = () => {
  const [{ loading, data, error }, fetchData] = useFetch(
    '/api/v1/admin/category'
  );
  const [currentIndex, setCurrentIndex] = useState<indexType>(initialIndex);
  const [topList, setTopList] = useState<string[]>([]);
  const [middleList, setMiddleList] = useState<string[]>([]);
  const [bottomList, setBottomList] = useState<string[]>([]);
  const [categoryState, setCategoryState] = useState({ loading, data, error });

  const hasBottom = data && 'Majors' in data[currentIndex.top].middle[0];

  const handleBottomCurrentIndex = (value) => {
    const currentBottomIndex = bottomList.indexOf(value);
    setCurrentIndex({ ...currentIndex, bottom: currentBottomIndex });
  };

  const initializeMiddleIndex = (index) => {
    setCurrentIndex({ top: index, middle: 0, bottom: 0 });
  };

  const initializeBottomIndex = (index) => {
    setCurrentIndex({ ...currentIndex, middle: index, bottom: 0 });
  };

  const getNewMiddleList = (value: string) => {
    const currentTopIndex = topList.indexOf(value);
    setMiddleList(
      data[currentTopIndex].middle.map((mid) => mid.organizationName)
    );
    initializeMiddleIndex(currentTopIndex);
  };

  const getNewBottomList = (value: string) => {
    const currentMiddleIndex = middleList.indexOf(value) || 0;
    initializeBottomIndex(currentMiddleIndex);
    if (!hasBottom) {
      setBottomList([]);
      return;
    }
    const currentMiddleData = data[currentIndex.top].middle[currentMiddleIndex];
    const Majors = currentMiddleData ? currentMiddleData.Majors : [];
    const MajorNameList = Majors.map((mid) => mid.organizationName);
    setBottomList(MajorNameList);
  };

  useEffect(() => {
    if (!data) return;
    setTopList(data.map((obj) => obj.top));
    setMiddleList(
      data[currentIndex.top].middle.map((mid) => mid.organizationName)
    );
    return () => {
      setTopList([]);
      setMiddleList([]);
    };
  }, [data]);

  useEffect(() => {
    getNewBottomList(middleList[currentIndex.middle]);
    setCurrentIndex({ ...currentIndex, bottom: 0 });
    return () => {
      setCurrentIndex(initialIndex);
    };
  }, [topList, middleList]);

  useEffect(() => {
    setCategoryState({ loading, data, error });
  }, [loading, data, error]);

  return {
    categoryState,
    fetchData,
    currentIndex,
    setCurrentIndex,
    topList,
    middleList,
    bottomList,
    setMiddleList,
    setBottomList,
    getNewMiddleList,
    getNewBottomList,
    handleBottomCurrentIndex,
    hasBottom,
  };
};

export default useGetCategory;
