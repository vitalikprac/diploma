import { Table, TreeSelect } from 'antd';
import React, { useCallback, useEffect } from 'react';
import ReactJson from 'react-json-view';
import { useRecoilState, useRecoilValue } from 'recoil';

import { dataSelector } from '../../../recoil/recoil';
import { convertToTreeData } from '../../../utils/fieldHelpers';
import { StorageHome } from '../../../utils/storageHelper';
import { viewFieldsSelector, viewKeyFieldSelector, viewState } from '../recoil';

import * as S from './TableData.styled';

const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const TableData = () => {
  const data = useRecoilValue(dataSelector);

  const viewField = useRecoilValue(viewState);
  const [keyField, setKeyField] = useRecoilState(viewKeyFieldSelector);
  const [fields, setFields] = useRecoilState(viewFieldsSelector);

  useEffect(() => {
    StorageHome.set(viewField);
  }, [viewField]);

  const rowExpandRenderFunc = useCallback(
    (record) => (
      <ReactJson
        displayDataTypes={false}
        enableClipboard={false}
        src={record}
      />
    ),
    [],
  );

  if (!data) {
    return <S.Wrapper>Дані не завантажені</S.Wrapper>;
  }

  const columns = fields.map((subField) => ({
    title: capitalizeFirst(subField),
    dataIndex: subField,
    key: subField,
    sorter: (a, b) => {
      const x = a[subField];
      const y = b[subField];
      if (typeof x === 'string') {
        return x.localeCompare(y);
      }
      if (typeof x === 'number') {
        return x - y;
      }
      return null;
    },
  }));

  return (
    <S.Wrapper>
      <h3>Перегляд всіх даних за списком</h3>
      <div>
        Виберіть поля для відображення (необхідно вибрати 1 поле як <b>ключ</b>{' '}
        і будь яку якільсть інших полів)
      </div>
      <S.SelectWrapper>
        <TreeSelect
          placeholder="Виберіть ключове поле"
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          style={{ width: '100%' }}
          treeData={convertToTreeData(data?.[0])}
          onChange={setKeyField}
          defaultValue={keyField}
          treeIcon
        />
        <TreeSelect
          placeholder="Виберіть додаткові поля"
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          style={{ width: '100%' }}
          treeData={convertToTreeData(data?.[0])}
          treeCheckable
          onChange={setFields}
          defaultValue={fields}
          treeIcon
        />
      </S.SelectWrapper>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: rowExpandRenderFunc,
        }}
        rowKey={(record) => record[keyField]}
        dataSource={fields?.length > 0 ? data : null}
      />
    </S.Wrapper>
  );
};

export default TableData;
