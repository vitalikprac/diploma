import { Tabs } from 'antd';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../../components/ErrorFallback';

import Describe from './Describe';
import SelectData from './SelectData';
import ViewData from './ViewData';
import * as S from './CloudMap.styled';

const { TabPane } = Tabs;

const CloudMap = () => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (key) => {
    setTab(key);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <S.Wrapper onChange={handleTabChange} defaultActiveKey="1">
        <TabPane forceRender tab="Опис" key="1">
          <Describe />
        </TabPane>
        <TabPane forceRender tab="Вибір даних" key="3">
          <SelectData />
        </TabPane>
        <TabPane forceRender tab="Перегляд даних" key="2">
          <ViewData activeTab={tab} />
        </TabPane>
      </S.Wrapper>
    </ErrorBoundary>
  );
};

export default CloudMap;
