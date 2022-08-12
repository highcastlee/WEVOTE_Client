import * as React from 'react';

import CandidateClassification from '@components/Common/CandidateClassification';
import HomeBoard from '@components/HomeBoard';

const Home = () => {
  return (
    <>
      <HomeBoard />
      <CandidateClassification />
    </>
  );
};

export default Home;
