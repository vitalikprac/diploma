import { Tabs } from 'antd';

import TableData from './TableData/TableData';
import UploadFile from './UploadFile';
import * as S from './Home.styled';

const { TabPane } = Tabs;

const Home = () => (
  <S.Wrapper defaultActiveKey="1">
    <TabPane tab="Завантаження даних" key="1">
      <UploadFile />
    </TabPane>
    <TabPane tab="Перегляд даних" key="2">
      <TableData />
    </TabPane>
    <TabPane tab="Продовження..." key="3">
      Продовження
    </TabPane>
  </S.Wrapper>
);

export default Home;
