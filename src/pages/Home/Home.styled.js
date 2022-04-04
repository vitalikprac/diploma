import styled from 'styled-components';

import { HEIGHT, WIDTH } from './constants';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloudWrapper = styled.div`
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
  border: 1px solid black;
`;

export const CloudDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  height: ${HEIGHT}px;
  width: 300px;
  border: 1px solid black;
  margin-left: 0.5rem;
  overflow: auto;
`;

export const SvgCloud = styled.svg.attrs({
  className: 'cloud',
})`
  user-select: none;
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
`;
