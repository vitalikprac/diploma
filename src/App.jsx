import { ConfigProvider } from 'antd';
import ukUa from 'antd/lib/locale/uk_UA';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { DataContext } from './context/DataContext';
import { theme } from './resources/theme';
import RoutesList from './routes/RoutesList';
import { readStorageData } from './storage/dataStorage';

import './App.css';

const App = () => {
  const [data, setData] = useState(readStorageData());
  const dataValue = useMemo(() => ({ data, setData }), [data, setData]);

  return (
    <DataContext.Provider value={dataValue}>
      <ConfigProvider locale={ukUa}>
        <ThemeProvider theme={theme}>
          <RoutesList />
        </ThemeProvider>
      </ConfigProvider>
    </DataContext.Provider>
  );
};

export default App;
