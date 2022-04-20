import { Tabs } from 'antd';
import { useState } from 'react';

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

  return (
    <CloudMapContext.Provider
      value={{
        displayField,
        sizeFunction,
        setDisplayField,
        setSizeFunction,
        selectFields,
        setSelectFields,
      }}
    >
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
    </CloudMapContext.Provider>
  );
};

export default CloudMap;
