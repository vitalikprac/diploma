import { Button, Divider, Input, TreeSelect } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactJson from 'react-json-view';
import { useRecoilState, useRecoilValue } from 'recoil';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';

import CloudWords from '../../../components/CloudWords';
import ErrorFallback from '../../../components/ErrorFallback';
import { dataSelector } from '../../../recoil/recoil';
import { convertToTreeData } from '../../../utils/fieldHelpers';
import { CloudMapStorage } from '../../../utils/storageHelper';
import {
  additionalFieldsSelector,
  cloudMapState,
  displayFieldSelector,
  sizeFunctionSelector,
} from '../recoil';

import * as S from './SelectData.styled';

const { TextArea } = Input;

const SelectData = () => {
  const data = useRecoilValue(dataSelector);

  const cloudMap = useRecoilValue(cloudMapState);
  const [displayField, setDisplayField] = useRecoilState(displayFieldSelector);
  const [additionalFields, setAdditionalFields] = useRecoilState(
    additionalFieldsSelector,
  );
  const [sizeFunction, setSizeFunction] = useRecoilState(sizeFunctionSelector);
  const [sizeFunctionValue, setSizeFunctionValue] = useState(sizeFunction);
  const firstItem = data?.[0];

  const handleSaveFunction = () => {
    setSizeFunction(sizeFunctionValue);
  };

  const slicedData = useMemo(() => data?.slice(0, 100), [data]);

  useEffect(() => {
    CloudMapStorage.set(cloudMap);
  }, [cloudMap]);

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
        <h4>
          Виберіть поле для відображення (повинне бути довільного типу який
          можна відобразити як &quot;рядок&quot; або &quot;число&quot;)
        </h4>
        <TreeSelect
          placeholder="Виберіть поле"
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          style={{ width: '100%' }}
          treeData={convertToTreeData(firstItem)}
          onChange={setDisplayField}
          defaultValue={displayField}
          treeIcon
        />
        <div>
          {displayField && (
            <>
              <span>Обране поле </span>
              <b>{displayField} </b> зі значенням{' '}
              <i>`{firstItem[displayField]}`</i>
            </>
          )}
        </div>
      </S.SelectWrapper>
      <S.SelectWrapper>
        <div>
          <h4>
            Напишіть функцію по якому критерію відбудеться будування хмари тегів
          </h4>
          Перший аргумент функції це значення одного елементу
          <br />З функції необхідно повернути значення <b>(число)</b> яке буде
          використовуватися як розмір тега для побудови хмари тегів
        </div>
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
        <h4>Виберіть додаткові поля</h4>
        Значення цих полей будуть відображені при обранні елементу в хмарі
        <TreeSelect
          placeholder="Виберіть додаткові поля"
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          style={{ width: '100%' }}
          treeData={convertToTreeData(data?.[0])}
          treeCheckable
          onChange={setAdditionalFields}
          defaultValue={additionalFields}
          treeIcon
        />
      </S.SelectWrapper>
      <Divider />
      <h2>Крок 3. Попередній перегляд</h2>
      <div>Спрощена версія, кількість елементів(100)</div>
      <S.CloudWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CloudWords id="cloud-words-demo" data={slicedData} />
        </ErrorBoundary>
      </S.CloudWrapper>
    </S.Wrapper>
  );
};

export default SelectData;
