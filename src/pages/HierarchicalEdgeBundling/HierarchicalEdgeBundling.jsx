import { Tabs } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../../components/ErrorFallback';

import Describe from './Describe';
import SelectData from './SelectData';
import ViewData from './ViewData';
import * as S from './HierarchicalEdgeBundling.styled';

const { TabPane } = Tabs;

const HierarchicalEdgeBundling = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <S.Wrapper defaultActiveKey="1">
      <TabPane forceRender tab="Опис" key="1">
        <Describe />
      </TabPane>
      <TabPane forceRender tab="Вибір даних" key="3">
        <SelectData />
      </TabPane>
      <TabPane forceRender tab="Перегляд даних" key="2">
        <ViewData />
      </TabPane>
    </S.Wrapper>
  </ErrorBoundary>
);

export default HierarchicalEdgeBundling;
