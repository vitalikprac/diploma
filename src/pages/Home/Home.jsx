import { Tabs } from 'antd';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../../components/ErrorFallback';

import TableData from './TableData/TableData';
import UploadFile from './UploadFile';
import * as S from './Home.styled';

const { TabPane } = Tabs;

const Home = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <S.Wrapper defaultActiveKey="1">
      <TabPane tab="Завантаження даних" key="1">
        {/* TODO завантаження page */}
        <Suspense fallback={<div>Завантаження...</div>}>
          <UploadFile />
        </Suspense>
      </TabPane>
      <TabPane tab="Перегляд даних" key="2">
        <TableData />
      </TabPane>
    </S.Wrapper>
  </ErrorBoundary>
);

export default Home;
