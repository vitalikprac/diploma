import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../components/Header';
import { DataContext } from '../context/DataContext';

import { PAGES } from './paths';

const RoutesList = () => {
  const { data } = useContext(DataContext);

  return (
    <Router>
      <Header />
      <Routes>
        {PAGES.map(({ id, path, element, needData }) => {
          if (needData && !data) {
            return null;
          }
          return <Route key={id} path={path} element={element} />;
        })}

        <Route path="*" element={PAGES[0].element} />
      </Routes>
    </Router>
  );
};

export default RoutesList;
