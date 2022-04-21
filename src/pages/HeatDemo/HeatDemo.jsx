import { Tabs } from 'antd';
import { useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../../components/ErrorFallback';
import { HeatMapContext } from '../../context/HeatMapContext';

import Describe from './Describe';
import SelectData from './SelectData';
import ViewData from './ViewData';
import * as S from './HeatDemo.styled';

const { TabPane } = Tabs;

const HeatDemo = () => {
  const [sizeFunction, setSizeFunction] = useState(
    () => (x) => x.description.length,
  );
  const [hoverFunction, setHoverFunction] = useState(
    () => (value) => `Довжина опису публікації ${value}`,
  );

  const heatMapValue = useMemo(
    () => ({
      setSizeFunction,
      sizeFunction,
      hoverFunction,
      setHoverFunction,
      color: {
        from: 'white',
        to: '#0007b7',
      },
    }),
    [setSizeFunction, sizeFunction, hoverFunction, setHoverFunction],
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HeatMapContext.Provider value={heatMapValue}>
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
      </HeatMapContext.Provider>
    </ErrorBoundary>
  );
};

export default HeatDemo;
