import styled from 'styled-components';

import { HEADER_HEIGHT } from '../../utils/constants';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  & svg {
    user-select: none;
    width: 100%;
    height: calc(100% - ${HEADER_HEIGHT}px);
    g text {
      cursor: pointer;
    }
  }
`;

export const Settings = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 2rem;
  top: 1rem;
  height: 150px;
  width: 200px;
  padding: 0.5rem;
  background-color: rgba(53, 192, 192, 0.2);
`;

export const SettingsTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
