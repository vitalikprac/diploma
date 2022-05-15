import T from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  additionalFieldsSelector,
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
  const [currentObject, setCurrentObject] = useState({});

  const additionalFields = useRecoilValue(additionalFieldsSelector);

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
      rawData: data,
      setCurrentObject,
    });
  }, [data, sizeFunction, rangeDebouncedValue, size, hoverFunction, color]);

  return (
    <S.Wrapper>
      {Object.keys(currentObject).length > 0 && (
        <S.Selected>
          <h4>Вибраний елемент</h4>
          {additionalFields?.map((field) => (
            <div key={field}>
              <b>{field}</b> - {currentObject?.[field]}
            </div>
          ))}
        </S.Selected>
      )}
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
