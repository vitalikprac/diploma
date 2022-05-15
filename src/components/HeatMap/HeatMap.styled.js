import { Slider as SliderAntd } from 'antd';
import styled from 'styled-components';

export const Slider = styled(SliderAntd)`
  padding: 1rem;
  margin: 0;
  width: ${(props) => props.width}px;
`;

export const Selected = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 300px;
  height: 100%;
  padding: 0.5rem;
  overflow-y: auto;
  overflow-wrap: anywhere;
  background-color: rgba(53, 192, 192, 0.2);
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  margin: 1rem;
`;

export const SvgContainer = styled.div`
  position: relative;
`;
