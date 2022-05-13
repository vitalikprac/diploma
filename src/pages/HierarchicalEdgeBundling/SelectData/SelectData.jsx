import { Button, Divider, Input, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { useRecoilState, useRecoilValue } from 'recoil';

import { dataSelector } from '../../../recoil/recoil';
import { convertToTreeData } from '../../../utils/fieldHelpers';
import { HierarchicalStorage } from '../../../utils/storageHelper';
import {
  connectionFunctionState,
  displayFieldState,
  hierarchicalState,
  identifierFieldState,
} from '../recoil';

import * as S from './SelectData.styled';

const { TextArea } = Input;

const SelectData = () => {
  const data = useRecoilValue(dataSelector);

  const firstItem = data?.[0];

  const [identifierField, setIdentifierField] =
    useRecoilState(identifierFieldState);

  const [displayField, setDisplayField] = useRecoilState(displayFieldState);
  const [connectionFunction, setConnectionFunction] = useRecoilState(
    connectionFunctionState,
  );

  const hierarchical = useRecoilValue(hierarchicalState);

  const [connectionFunctionValue, setConnectionFunctionValue] =
    useState(connectionFunction);
  const handleSaveFunction = () => {
    setConnectionFunction(connectionFunctionValue);
  };

  useEffect(() => {
    HierarchicalStorage.set(hierarchical);
  }, [hierarchical]);

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
      <S.Step>Крок 2. Конфігурація </S.Step>
      <S.SelectWrapper>
        <div>
          Виберіть поле для унікального ідентифікатору (поле повинне бути
          унікальним для всіх інших даних)
        </div>
        <TreeSelect
          placeholder="Виберіть поле"
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          style={{ width: '100%' }}
          treeData={convertToTreeData(firstItem)}
          onChange={setIdentifierField}
          defaultValue={identifierField}
          treeIcon
        />
        <div>
          {identifierField && (
            <>
              <b>{identifierField} </b>:<i> {firstItem[identifierField]}</i>
            </>
          )}
        </div>
      </S.SelectWrapper>
      <br />
      <S.SelectWrapper>
        <div>Виберіть відображаємо поле</div>
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
      <br />
      <S.SelectWrapper>
        <div>
          Напишіть функцію яка зв`язує два елементи по спеціальному критерію
          <br />
          Перший аргумент - перший елемент
          <br />
          Другий аргумент - другий елемет
          <br />З функції необхідно повернути булеве значення <b>true</b> яке
          показує що елементи зв`язані між собою
        </div>
        <TextArea
          spellCheck={false}
          rows={4}
          placeholder="Напишіть функцію тут"
          onChange={(e) => setConnectionFunctionValue(e.target.value)}
          value={connectionFunctionValue}
        />
        <Button onClick={handleSaveFunction}>Зберегти функцію</Button>
      </S.SelectWrapper>
    </S.Wrapper>
  );
};

export default SelectData;
