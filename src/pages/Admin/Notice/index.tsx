import React, { useEffect, useState } from 'react';

import AddForm from '../Common/AddForm';
import client from '@api/client';
import NoticeForm from './NoticeForm';
import NoticeList from './NoticeList';
import { useAlert } from 'react-alert';
import useFetch from '@hooks/useFetch';

export interface NoticeData {
  id: number;
  content: string;
  startDate: string;
  endDate: string;
}

const initialData = [
  {
    id: 0,
    content: '등록된 공지사항이 없습니다',
    startDate: '',
    endDate: '',
  },
];

const NoticeArticle = () => {
  const [{ loading, data, error }, fetchData] = useFetch(
    '/api/v1/admin/banner'
  );
  const [rows, setRows] = useState<NoticeData[]>([]);
  const [editData, setEditData] = useState<NoticeData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(loading);
  const alert = useAlert();

  const onCloseModal = () => setIsOpen(false);

  const isDefault = (id) => initialData[0].id === id;

  const onUpdate = (id) => {
    if (isDefault(id)) return;
    setEditData(data.filter((obj) => obj.id === id)[0]);
    setIsOpen(true);
  };

  const confirmDeletion = (id) => {
    if (isDefault(id)) return;
    if (window.confirm('해당 정보를 삭제하시겠습니까?')) onDelete(id);
  };

  const onDelete = async (id) => {
    setIsLoading(true);
    try {
      await client
        .delete(`/api/v1/admin/banner/${id}`)
        .then((res) => {
          alert.success('배너 삭제 완료');
          fetchData();
        })
        .catch((e) => {
          alert.error('데이터를 삭제할 수 없습니다.');
        });
    } catch (e) {
      alert.error('데이터를 삭제할 수 없습니다');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      setRows(initialData);
      return;
    }
    setRows(
      data.map((obj) => {
        return {
          id: obj.id,
          content: obj.content,
          startDate: obj.startDate,
          endDate: obj.endDate,
        };
      })
    );
    return () => setRows(initialData);
  }, [data]);

  useEffect(() => {
    if (!loading) setIsLoading(false);
    return () => setIsLoading(false);
  }, [loading]);

  return (
    <>
      <AddForm component={<NoticeForm fetchData={fetchData} />} />
      <NoticeList
        loading={isLoading}
        rows={rows}
        editData={editData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fetchData={fetchData}
        onCloseModal={onCloseModal}
        onUpdate={onUpdate}
        confirmDeletion={confirmDeletion}
      />
    </>
  );
};

export default NoticeArticle;
