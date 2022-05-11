import { Button, Divider, Input } from 'antd';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactJson from 'react-json-view';
import { useRecoilState, useRecoilValue } from 'recoil';

import ErrorFallback from '../../../components/ErrorFallback';
import HeatMap from '../../../components/HeatMap';
import { dataSelector } from '../../../recoil/recoil';
import { HeatMapStorage } from '../../../utils/storageHelper';
import {
  heatMapState,
  hoverFunctionSelector,
  sizeFunctionSelector,
} from '../recoil';

import * as S from './SelectData.styled';

const { TextArea } = Input;

const SelectData = () => {
  const data = useRecoilValue(dataSelector);
  const firstItem = data?.[0];

  const heatmap = useRecoilValue(heatMapState);

  const [sizeFunction, setSizeFunction] = useRecoilState(sizeFunctionSelector);
  const [sizeFunctionValue, setSizeFunctionValue] = useState(sizeFunction);

  const [hoverFunction, setHoverFunction] = useRecoilState(
    hoverFunctionSelector,
  );
  const [hoverFunctionValue, setHoverFunctionValue] = useState(hoverFunction);

  const handleSaveFunction = () => {
    setSizeFunction(sizeFunctionValue);
  };

  const handleSaveHoverFunction = () => {
    setHoverFunction(hoverFunctionValue);
  };

  useEffect(() => {
    HeatMapStorage.set(heatmap);
  }, [heatmap]);

  return (
    <S.Wrapper>
      <S.Step>Крок 1. Перегляд полів даних</S.Step>
      <ReactJson
        displayDataTypes={false}
        enableClipboard={false}
        src={firstItem}
        collapsed
      />
      <Divider />
      <S.Step>Крок 2. Конфігурація</S.Step>
      <S.SelectWrapper>
        <div>
          Напишіть функцію по якому критерію відбудеться будування теплокарти
        </div>
        <TextArea
          spellCheck={false}
          rows={4}
          placeholder="Напишіть функцію тут"
          onChange={(e) => setSizeFunctionValue(e.target.value)}
          value={sizeFunction}
        />
        <Button onClick={handleSaveFunction}>Зберегти функцію</Button>
      </S.SelectWrapper>
      <S.SelectWrapper>
        <div>
          Напишіть функцію по якому буде з`являтися підсказка при наведенні на
          елемент
        </div>
        <TextArea
          spellCheck={false}
          rows={4}
          placeholder="Напишіть функцію тут"
          onChange={(e) => setHoverFunctionValue(e.target.value)}
          value={hoverFunctionValue}
        />
        <Button onClick={handleSaveHoverFunction}>Зберегти функцію</Button>
      </S.SelectWrapper>
      <Divider />
      <S.Step>Крок 3. Перегляд</S.Step>
      <div>Спрощена версія</div>
      <S.CloudWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HeatMap
            id="heatmap-demo"
            size={{ height: 600, width: 800 }}
            color={{
              from: 'white',
              to: 'red',
            }}
            data={data}
          />
        </ErrorBoundary>
      </S.CloudWrapper>
    </S.Wrapper>
  );
};

SelectData.propTypes = {};

export default SelectData;
