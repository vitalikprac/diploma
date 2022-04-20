import { Tabs } from 'antd';
import { useContext, useEffect, useState } from 'react';

import CloudWords from '../../components/CloudWords';
import { CloudMapContext } from '../../context/CloudMapContext';
import { DataContext } from '../../context/DataContext';

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
          <div>
            <b>Хмара тегів (хмара слів, або зважений список) </b>— це візуальне
            подання списку категорій (або тегів, також званих мітками, ярликами,
            ключовими словами, тощо).
          </div>
          <div>Приклад хмари тегів:</div>
          <div>Example</div>
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
