import { Radio, Space, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';

import * as S from './UploadFile.styled';

const { Dragger } = Upload;

/* const beautifyData = (data) => {
  if (!data) {
    return null;
  }
  return Object.entries(data).map(([key, value]) => {
    if (value instanceof Array) {
      return [key, '[...]'];
    }
    return [key, value];
  });
}; */

const UploadFile = () => {
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState(null);
  const [selectedField, setSelectedField] = useState(0);

  const beforeUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setFileName(file.name);
      setFileData(JSON.parse(e.target.result.toString()));
    };
    reader.readAsText(file);

    return false;
  };

  useEffect(() => {
    console.log(fileData);
  }, [fileData]);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setSelectedField(e.target.value);
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
      <div>Крок 1. Завантажте файл</div>
      <span />
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
      <div>Крок 2. Вибрати данні для візуалізації (повинен бути масив)</div>
      {convertDataToSelect(fileData, fileName)}
    </S.Wrapper>
  );
};

export default UploadFile;
