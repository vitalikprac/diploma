import { ConfigProvider, Spin } from 'antd';
import ukUa from 'antd/lib/locale/uk_UA';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { theme } from './resources/theme';
import RoutesList from './routes/RoutesList';

import './App.css';

const App = () => (
  <RecoilRoot>
    <ConfigProvider locale={ukUa}>
      <ThemeProvider theme={theme}>
        <Suspense
          fallback={
            <div>
              <Spin size="large" />
            </div>
          }
        >
          <RoutesList />
        </Suspense>
      </ThemeProvider>
    </ConfigProvider>
  </RecoilRoot>
);

export default App;
