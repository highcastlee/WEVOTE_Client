import * as React from 'react';

import { Home, Info, Login, Register } from './pages';
import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import GlobalStyle from '@styles/GlobalStyle';
import Layout from '@/pages/Layout/Layout';
import storeTypes from 'storeTypes';
import { useSelector } from 'react-redux';

const Pledge = lazy(() => import('./pages/Pledge/Pledge'));
const Admin = lazy(() => import('./pages/Admin/Admin'));

const App = () => {
  const { user } = useSelector((state: storeTypes.sliceState) => ({
    user: state.user.user,
  }));
  const isAdmin = true;
  // const isAdmin = user && user.status === process.env.REACT_APP_ADMIN_CODE;

  return (
    <Router>
      <GlobalStyle />
      <Suspense fallback={<div>Loading.....</div>}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/info" component={Info} />
            <Route path="/promise/promise-detail/:id" component={Pledge} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {isAdmin && <Route exact path="/admin" component={Admin} />}
          </Switch>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
