import { Tabs } from 'antd';

import UploadFile from './UploadFile';
import * as S from './Home.styled';

const { TabPane } = Tabs;

const Home = () => (
  <S.Wrapper defaultActiveKey="1">
    <TabPane tab="Завантаження даних" key="1" style={{ height: 200 }}>
      <UploadFile />
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </S.Wrapper>
);

export default Home;
