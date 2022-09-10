import * as React from 'react';

import { useCallback, useEffect, useState } from 'react';

import { CandidateCarousel } from './Candidate/CandidateCarousel';
import { CommentSection } from './Comment/CommentSection';
import Loader from '@components/Loader';
import { PledgeDetail } from './PledgeDetail/PledgeDetail';
import useFetch from '@hooks/useFetch';
import { useParams } from 'react-router-dom';

function Pledge() {
  const { id } = useParams<{ id: string }>();
  const [{ loading, data, error }, fetchData] = useFetch(
    `/api/v1/promise/promise-detail/${id}`
  );
  const [current, setCurrent] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [height]);

  const pledgePageRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      {data ? (
        <div ref={pledgePageRef}>
          <CandidateCarousel
            title={data.organizationName}
            teamArr={data.Teams}
            current={current}
            setCurrent={setCurrent}
          />
          <PledgeDetail
            pledgeArr={data.Teams[current].Promises}
            slogan={data.Teams[current].slogan}
          />
          <CommentSection
            teamId={data.Teams[current].id}
            qnaArr={data.Teams[current].Qnas}
            fetchData={fetchData}
          />
        </div>
      ) : (
        <Loader margin={100} />
      )}
    </>
  );
}

export default Pledge;
