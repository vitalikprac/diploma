import { Slider as SliderAntd } from 'antd';
import styled from 'styled-components';

export const Slider = styled(SliderAntd)`
  padding: 1rem;
  margin: 0;
  width: ${(props) => props.width}px;
`;

export const Wrapper = styled.div`
  margin: 1rem;
`;

export const SvgContainer = styled.div`
  position: relative;
`;
