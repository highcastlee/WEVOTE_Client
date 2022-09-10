import client from '@api/client';
import InformationForm from './InformationForm';
import InformationList from './InformationList';
import React from 'react';
import { useAlert } from 'react-alert';
import useFetch from '@hooks/useFetch';

const Information = () => {
  const [{ loading, data, error }, fetchData] = useFetch('/api/v1/admin/info');
  const alert = useAlert();

  const onDelete = async (id) => {
    try {
      await client
        .delete(`/api/v1/admin/info/${id}`)
        .then((response) => {
          alert.success('이미지가 삭제되었습니다.');
          fetchData();
        })
        .catch((e) => {
          console.log(e);
          alert.error('이미지를 삭제할 수 없습니다.');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const confirmDeletion = (id) => {
    if (id === 'all' && window.confirm('모든 이미지를 삭제하시겠습니까?')) {
      onDelete(id);
    } else if (window.confirm('해당 이미지를 삭제하시겠습니까?')) onDelete(id);
  };

  return (
    <>
      <InformationForm
        fetchData={fetchData}
        confirmDeletion={confirmDeletion}
      />
      <InformationList
        loading={loading}
        data={data}
        error={error}
        confirmDeletion={confirmDeletion}
      />
    </>
  );
};

export default Information;
