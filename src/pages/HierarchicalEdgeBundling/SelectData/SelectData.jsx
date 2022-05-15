import { Button, Divider, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { useRecoilState, useRecoilValue } from 'recoil';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';

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
      <h2>Крок 1. Перегляд полів довільного елементу (першого)</h2>
      <ReactJson
        displayDataTypes={false}
        enableClipboard={false}
        src={firstItem}
        collapsed
      />
      <Divider />
      <h2>Крок 2. Конфігурація </h2>
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
              <span>Обране поле </span>
              <b>{identifierField} </b> зі значенням{' '}
              <i>`{firstItem[identifierField]}`</i>
            </>
          )}
        </div>
      </S.SelectWrapper>
      <br />
      <S.SelectWrapper>
        <div>Виберіть поле яке буде відобрражатися на візуалізації</div>
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
      <br />
      <S.SelectWrapper>
        <div>
          <h4>
            Напишіть функцію яка зв`язує два елементи по спеціальному критерію
          </h4>
          <b>firstElement</b> - перший аргумент
          <br />
          <b>secondElement</b> - другий аргумент
          <br />З функції необхідно повернути булеве значення <b>true</b> яке
          показує що елементи зв`язані між собою
        </div>

        <CodeMirror
          value={connectionFunctionValue}
          height="150px"
          extensions={[javascript()]}
          theme="dark"
          onChange={setConnectionFunctionValue}
        />
        <Button onClick={handleSaveFunction}>Зберегти функцію</Button>
      </S.SelectWrapper>
    </S.Wrapper>
  );
};

export default SelectData;
