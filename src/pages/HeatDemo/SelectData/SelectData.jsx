import { Button, Divider, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactJson from 'react-json-view';
import { useRecoilState, useRecoilValue } from 'recoil';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';

import ErrorFallback from '../../../components/ErrorFallback';
import HeatMap from '../../../components/HeatMap';
import { dataSelector } from '../../../recoil/recoil';
import { convertToTreeData } from '../../../utils/fieldHelpers';
import { HeatMapStorage } from '../../../utils/storageHelper';
import {
  additionalFieldsSelector,
  heatMapState,
  hoverFunctionSelector,
  sizeFunctionSelector,
} from '../recoil';

import * as S from './SelectData.styled';

// TODO select data
const SelectData = () => {
  const data = useRecoilValue(dataSelector);
  const firstItem = data?.[0];

  const heatmap = useRecoilValue(heatMapState);

  const [sizeFunction, setSizeFunction] = useRecoilState(sizeFunctionSelector);
  const [sizeFunctionValue, setSizeFunctionValue] = useState(sizeFunction);

  const [additionalFields, setAdditionalFields] = useRecoilState(
    additionalFieldsSelector,
  );
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

  const { color } = useRecoilValue(heatMapState);

  return (
    <S.Wrapper>
      <h2>Крок 1. Перегляд полів довільного елементу (першого)</h2>
      <ReactJson
        displayDataTypes={false}
        enableClipboard={false}
        src={firstItem}
        collapsed
      />
      <Divider />
      <h2>Крок 2. Конфігурація</h2>
      <S.SelectWrapper>
        <h4>Напишіть функцію</h4>
        <div>по якому критерію відбудеться будування теплокарти</div>
        <CodeMirror
          value={sizeFunctionValue}
          height="150px"
          extensions={[javascript()]}
          theme="dark"
          onChange={setSizeFunctionValue}
        />

        <Button onClick={handleSaveFunction}>Зберегти функцію</Button>
      </S.SelectWrapper>
      <S.SelectWrapper>
        <h4>Напишіть функцію</h4>
        <div>по якому буде з`являтися підсказка при наведенні на елемент</div>
        <CodeMirror
          value={hoverFunctionValue}
          height="150px"
          extensions={[javascript()]}
          theme="dark"
          onChange={setHoverFunctionValue}
        />
        <Button onClick={handleSaveHoverFunction}>Зберегти функцію</Button>
      </S.SelectWrapper>
      <S.SelectWrapper>
        <h4>Виберіть додаткові поля</h4>
        <div>Значення цих полей будуть відображені при обранні елементу</div>
        <TreeSelect
          placeholder="Виберіть поле"
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          style={{ width: '100%' }}
          treeData={convertToTreeData(firstItem)}
          onChange={setAdditionalFields}
          defaultValue={additionalFields}
          treeIcon
          multiple
        />
      </S.SelectWrapper>
      <Divider />
      <h2>Крок 3. Перегляд</h2>
      <div>Спрощена версія</div>
      <S.CloudWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HeatMap
            id="heatmap-demo"
            size={{ height: 600, width: 800 }}
            color={color}
            data={data}
          />
        </ErrorBoundary>
      </S.CloudWrapper>
    </S.Wrapper>
  );
};

SelectData.propTypes = {};

export default SelectData;
