import { Tabs as TabsAntd } from 'antd';
import styled from 'styled-components';

import { HEADER_HEIGHT } from '../../utils/constants';

export const Wrapper = styled(TabsAntd)`
  /*height: calc(100% - ${HEADER_HEIGHT}px);*/
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  margin-right: 1rem;
`;
