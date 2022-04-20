import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Header from '../components/Header';
import { DataContext } from '../context/DataContext';

import { PAGES } from './paths';

const RoutesList = () => {
  const { data } = useContext(DataContext);

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
