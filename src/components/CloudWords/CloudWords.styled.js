import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const CloudWrapper = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border: 1px solid black;
  position: relative;
`;

export const ZoomHelper = styled.div`
  position: absolute;
  padding: 0.25rem;
  top: 0;
  right: 0;
  background-color: aquamarine;
`;

export const CloudDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width};
  border: 1px solid black;
  margin-left: 0.5rem;
  overflow: auto;
`;

export const SvgCloud = styled.svg.attrs((x) => ({
  className: x.id || 'class',
}))`
  user-select: none;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;
