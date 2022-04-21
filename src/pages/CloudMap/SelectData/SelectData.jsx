import { Button, Divider, Input, TreeSelect } from 'antd';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactJson from 'react-json-view';

import CloudWords from '../../../components/CloudWords';
import { CloudMapContext } from '../../../context/CloudMapContext';
import { DataContext } from '../../../context/DataContext';
import { convertToTreeData } from '../../../utils/fieldHelpers';

import * as S from './SelectData.styled';

const { TextArea } = Input;

const defaultTextSelectFunction = `function prepare(item){
    return item.description.length;
}`;

const SelectData = () => {
  const { data } = useContext(DataContext);
  const { displayField, setSelectFields, setDisplayField, setSizeFunction } =
    useContext(CloudMapContext);
  const firstItem = data?.[0];

  const [readyFunction, setReadyFunction] = useState(
    // eslint-disable-next-line no-new-func
    new Function(`return ${defaultTextSelectFunction}`),
  );

  const [selectFunction, setSelectFunction] = useState(
    defaultTextSelectFunction,
  );

  const handleSaveFunction = () => {
    // eslint-disable-next-line no-new-func
    setReadyFunction(new Function(`return ${selectFunction}`));
  };

  const slicedData = useMemo(() => data?.slice(0, 100), [data]);

  useEffect(() => {
    if (readyFunction) {
      setSizeFunction(() => readyFunction);
      // setSizeFunction(readyFunction);
    }
  }, [readyFunction]);

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
          onChange={(e) => setSelectFunction(e.target.value)}
          value={selectFunction}
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
          onChange={setSelectFields}
          treeIcon
        />
      </S.SelectWrapper>
      <Divider />
      <S.Step>Крок 3. Перегляд</S.Step>
      <div>Спрощена версія, кількість елементів(100)</div>
      <S.CloudWrapper>
        <CloudWords
          id="cloud-words-demo"
          data={slicedData}
          displayField={displayField}
          sizeFunction={readyFunction}
        />
      </S.CloudWrapper>
    </S.Wrapper>
  );
};

export default SelectData;
