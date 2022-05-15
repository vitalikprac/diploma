import { Tabs as TabsAntd } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled(TabsAntd)`
  position: relative;
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 1rem;
  .ant-tabs-tab {
    font-size: 1.25rem;
  }
`;

export const PanicWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: rgb(212, 56, 13, 0.3);
  border-radius: 20px;
  gap: 1rem;
  h4 {
    margin-bottom: 0;
  }
  opacity: 0.5;
  cursor: help;
  &:hover {
    opacity: 1;
  }
`;

export const PanicColumn = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  ${(props) => (props?.none ? 'display:none;' : '')}
`;
