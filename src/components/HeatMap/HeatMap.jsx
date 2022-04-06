import { useEffect, useRef, useState } from 'react';

import pdl from '../../data/PDL-03-10-2022.json';

import { SIZE } from './constants';
import { drawHeatMap } from './d3Helper';
import { getCalculations } from './dataHelper';
import * as S from './HeatMap.styled';

const HeatMap = () => {
  const renderRef = useRef(null);
  const svgRef = useRef(null);

  const [rangeValue, setRangeValue] = useState([0, 100]);
  const [rangeDebouncedValue, setRangeDebouncedValue] = useState([0, 100]);

  useEffect(() => {
    const element = svgRef.current;
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }

    const calculations = getCalculations(pdl.dataset);
    renderRef.current = drawHeatMap({
      ...calculations,
      size: SIZE,
      minP: rangeValue[0],
      maxP: rangeValue[1],
    });
  }, [rangeDebouncedValue]);

  return (
    <S.Wrapper>
      <S.Slider
        onChange={setRangeValue}
        onAfterChange={setRangeDebouncedValue}
        range
        value={rangeValue}
        min={0}
        max={100}
      />
      <S.SvgContainer ref={svgRef} id="my_dataviz" />
    </S.Wrapper>
  );
};

export default HeatMap;
