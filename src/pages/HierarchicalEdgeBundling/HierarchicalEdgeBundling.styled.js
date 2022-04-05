import styled from 'styled-components';

import { HEADER_HEIGHT } from '../../utils/constants';

export const Wrapper = styled.div`
  height: calc(100% - ${HEADER_HEIGHT}px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
