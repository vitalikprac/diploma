import { Tabs } from 'antd';
import { useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../../components/ErrorFallback';
import { CloudMapContext } from '../../context/CloudMapContext';

import Describe from './Describe';
import SelectData from './SelectData';
import ViewData from './ViewData';
import * as S from './CloudMap.styled';

const { TabPane } = Tabs;

const CloudMap = () => {
  const [displayField, setDisplayField] = useState('title');
  const [selectFields, setSelectFields] = useState([]);
  const [sizeFunction, setSizeFunction] = useState(
    () => (x) => x.description.length,
  );

  const [tab, setTab] = useState(0);
  const handleTabChange = (key) => {
    setTab(key);
  };

  const cloudMapValue = useMemo(
    () => ({
      displayField,
      sizeFunction,
      setDisplayField,
      setSizeFunction,
      selectFields,
      setSelectFields,
    }),
    [
      displayField,
      sizeFunction,
      setDisplayField,
      setSizeFunction,
      selectFields,
      setSelectFields,
    ],
  );

  return (
    <CloudMapContext.Provider value={cloudMapValue}>
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
    </CloudMapContext.Provider>
  );
};

export default CloudMap;
