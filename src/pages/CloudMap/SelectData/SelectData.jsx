import { Button, Divider, Input, TreeSelect } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ReactJson from 'react-json-view';
import { useRecoilState, useRecoilValue } from 'recoil';

import CloudWords from '../../../components/CloudWords';
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
    CloudMapStorage.set({
      displayField,
      sizeFunction,
      additionalFields,
    });
  }, [cloudMap]);

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
        <div>Виберіть поле для відображення</div>
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
              <b>{displayField} </b>:<i> {firstItem[displayField]}</i>
            </>
          )}
        </div>
      </S.SelectWrapper>
      <S.SelectWrapper>
        <div>
          Напишіть функцію по якому критерію відбудеться будування хмари тегів
        </div>
        <TextArea
          spellCheck={false}
          rows={4}
          placeholder="Напишіть функцію тут"
          onChange={(e) => setSizeFunctionValue(e.target.value)}
          value={sizeFunctionValue}
        />
        <Button onClick={handleSaveFunction}>Зберегти функцію</Button>
      </S.SelectWrapper>
      <S.SelectWrapper>
        <div>
          Виберіть додаткові поля для відображення елементу який буде обрано
          пізніше
        </div>
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
      <S.Step>Крок 3. Перегляд</S.Step>
      <div>Спрощена версія, кількість елементів(100)</div>
      <S.CloudWrapper>
        <CloudWords id="cloud-words-demo" data={slicedData} />
      </S.CloudWrapper>
    </S.Wrapper>
  );
};

export default SelectData;
