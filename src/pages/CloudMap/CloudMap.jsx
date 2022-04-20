import { Tabs } from 'antd';
import { useContext } from 'react';

import CloudWords from '../../components/CloudWords';
import { DataContext } from '../../context/DataContext';

import * as S from './CloudMap.styled';

const { TabPane } = Tabs;

const CloudMap = () => {
  const { data } = useContext(DataContext);

  return (
    <S.Wrapper defaultActiveKey="1">
      <TabPane tab="Опис" key="1">
        <div>
          <b>Хмара тегів (хмара слів, або зважений список) </b>— це візуальне
          подання списку категорій (або тегів, також званих мітками, ярликами,
          ключовими словами, тощо).
        </div>
        <div>Приклад хмари тегів:</div>
      </TabPane>
      <TabPane tab="Перегляд даних" key="2">
        <CloudWords data={data} />
      </TabPane>
      <TabPane tab="Продовження..." key="3">
        Продовження
      </TabPane>
    </S.Wrapper>
  );
};

export default CloudMap;
