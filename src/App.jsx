import { ConfigProvider } from 'antd';
import ukUa from 'antd/lib/locale/uk_UA';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { RecoilPrepare } from './components/RecoilPrepare';
import { theme } from './resources/theme';
import RoutesList from './routes/RoutesList';

import './App.css';

const App = () => (
  <RecoilRoot>
    <RecoilPrepare />
    <ConfigProvider locale={ukUa}>
      <ThemeProvider theme={theme}>
        <RoutesList />
      </ThemeProvider>
    </ConfigProvider>
  </RecoilRoot>
);

export default App;
