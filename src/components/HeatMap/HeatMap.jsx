import T from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  hoverFunctionEvaluatedSelector,
  sizeFunctionEvaluatedSelector,
} from '../../pages/HeatDemo/recoil';

import { drawHeatMap } from './d3Helper';
import { getCalculations } from './dataHelper';
import * as S from './HeatMap.styled';

const HeatMap = ({ id, data, size, color }) => {
  const renderRef = useRef(null);
  const svgRef = useRef(null);

  const [rangeValue, setRangeValue] = useState([0, 100]);
  const [rangeDebouncedValue, setRangeDebouncedValue] = useState([0, 100]);

  const sizeFunction = useRecoilValue(sizeFunctionEvaluatedSelector);
  const hoverFunction = useRecoilValue(hoverFunctionEvaluatedSelector);

  useEffect(() => {
    const element = svgRef.current;
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }

    const calculations = getCalculations({ data, sizeFunction });
    renderRef.current = drawHeatMap({
      id,
      ...calculations,
      size,
      minP: rangeValue[0],
      maxP: rangeValue[1],
      sizeFunction,
      hoverFunction,
      fromColor: color.from,
      toColor: color.to,
    });
  }, [data, sizeFunction, rangeDebouncedValue, size, hoverFunction, color]);

  return (
    <S.Wrapper>
      <S.Slider
        width={size.width}
        onChange={setRangeValue}
        onAfterChange={setRangeDebouncedValue}
        range
        value={rangeValue}
        min={0}
        max={100}
      />
      <S.SvgContainer ref={svgRef} id={id} />
    </S.Wrapper>
  );
};

HeatMap.propTypes = {
  id: T.string,
  data: T.arrayOf(T.shape({})),
  sizeFunction: T.func,
  hoverFunction: T.func,
  size: T.shape({
    height: T.number,
    width: T.number,
  }),
  color: T.shape({
    from: T.string,
    to: T.string,
  }),
};

export default HeatMap;
