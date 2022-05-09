import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Header from '../components/Header';
import { dataLoadingState } from '../recoil/atoms';
import { dataSelector } from '../recoil/selectors';

import { PAGES } from './paths';

const RoutesList = () => {
  const data = useRecoilValue(dataSelector);

  const isDataLoading = useRecoilValue(dataLoadingState);
  if (isDataLoading) {
    return null;
  }
  return (
    <Router>
      <Header />
      <Routes>
        {PAGES.map(({ id, path, element, needData }) => (
          <Route
            key={id}
            path={path}
            element={
              needData && !data ? (
                <Navigate to={PAGES[0].path} replace />
              ) : (
                element
              )
            }
          />
        ))}

        <Route path="*" element={PAGES[0].element} />
      </Routes>
    </Router>
  );
};

export default RoutesList;
