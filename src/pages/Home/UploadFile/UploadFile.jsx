import { Radio, Space, Upload } from 'antd';
import { useContext, useState } from 'react';
import ReactJson from 'react-json-view';
import { InboxOutlined } from '@ant-design/icons';

import { DataContext } from '../../../context/DataContext';

import * as S from './UploadFile.styled';

const { Dragger } = Upload;

const UploadFile = () => {
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState(null);
  const [selectedField, setSelectedField] = useState(0);

  const { setData } = useContext(DataContext);

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
    const data = e.target.value;
    setData(data);
    setSelectedField(data);
  };

  const convertDataToSelect = (data, name) => {
    if (!data) {
      return null;
    }

    return (
      <S.SelectField>
        <Radio.Group onChange={onChange} value={selectedField}>
          <Space direction="vertical">
            <Radio disabled={!(data instanceof Array)} value={data}>
              <b>{name}</b>
            </Radio>

            {!(data instanceof Array) &&
              Object.entries(data).map(([key, value]) => (
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
      <S.StepDiv disabled={!fileData || !selectedField}>
        Крок 3. Перегляд прикладу
      </S.StepDiv>
      <S.JsonWrapper>
        {selectedField?.[0] && selectedField[0] instanceof Object && (
          <ReactJson
            displayDataTypes={false}
            enableClipboard={false}
            src={selectedField?.[0]}
          />
        )}
      </S.JsonWrapper>
    </S.Wrapper>
  );
};

export default UploadFile;
