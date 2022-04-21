import { Tabs as TabsAntd } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled(TabsAntd)`
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 1.15rem;
  .ant-tabs-tab {
    font-size: 1.25rem;
  }
`;
