import { Radio, Space, Upload } from 'antd';
import { useContext, useState } from 'react';
import ReactJson from 'react-json-view';
import { InboxOutlined } from '@ant-design/icons';

import { DataContext } from '../../../context/DataContext';
import { saveStorageData } from '../../../storage/dataStorage';

import * as S from './UploadFile.styled';

const { Dragger } = Upload;

const UploadFile = () => {
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState(null);
  const [selectedField, setSelectedField] = useState(0);

  const { setData, data } = useContext(DataContext);

  const beforeUpload = (file) => {
    const reader = new FileReader();
    setFileName('');
    setFileData(null);
    setSelectedField(0);
    reader.onload = (e) => {
      setFileName(file.name);
      setFileData(JSON.parse(e.target.result.toString()));
    };
    reader.readAsText(file);

    return false;
  };

  const onChange = (e) => {
    const dataValue = e.target.value;
    setData(dataValue);
    setSelectedField(dataValue);
    saveStorageData(dataValue);
  };

  const convertDataToSelect = (rawData, name) => {
    if (!rawData) {
      return null;
    }

    return (
      <S.SelectField>
        <Radio.Group onChange={onChange} value={selectedField}>
          <Space direction="vertical">
            <Radio disabled={!(rawData instanceof Array)} value={rawData}>
              <b>{name}</b>
            </Radio>

            {!(rawData instanceof Array) &&
              Object.entries(rawData).map(([key, value]) => (
                <Radio
                  disabled={!(value instanceof Array)}
                  value={value}
                  key={key}
                >
                  <S.ChildField>
                    <b>{key}</b> : <span>[...]</span>
                  </S.ChildField>
                </Radio>
              ))}
          </Space>
        </Radio.Group>
      </S.SelectField>
    );
  };

  return (
    <S.Wrapper>
      <S.StepDiv firstTop> Крок 1. Завантажте файл</S.StepDiv>
      <S.TextSpan>
        Необхідно завантажити файл з даними у форматі json (повинен бути масив
        або об`єкт з масивом)
      </S.TextSpan>
      <Dragger
        accept=".json"
        name="file"
        multiple={false}
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Натисніть або перетягніть файл для завантаження
        </p>
      </Dragger>
      <S.StepDiv disabled={!fileData}>
        Крок 2. Виберіть данні для візуалізації (повинен бути масив)
      </S.StepDiv>
      {convertDataToSelect(fileData, fileName)}
      <S.StepDiv disabled={!data?.[0]}>Крок 3. Перегляд прикладу</S.StepDiv>
      <S.JsonWrapper>
        {data?.[0] instanceof Object && (
          <ReactJson
            displayDataTypes={false}
            enableClipboard={false}
            src={data?.[0]}
          />
        )}
      </S.JsonWrapper>
    </S.Wrapper>
  );
};

export default UploadFile;
