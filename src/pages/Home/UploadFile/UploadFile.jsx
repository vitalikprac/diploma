import { Radio, Space, Upload } from 'antd';
import ReactJson from 'react-json-view';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { InboxOutlined } from '@ant-design/icons';

import {
  dataSelector,
  fileDataSelector,
  fileNameSelector,
  fileSelectedDataPathSelector,
  fileState,
} from '../../../recoil/recoil';
import { convertFileToObject } from '../../../utils/fileHelper';
import { StorageFile } from '../../../utils/storageHelper';

import * as S from './UploadFile.styled';

const { Dragger } = Upload;

const UploadFile = () => {
  const setFile = useSetRecoilState(fileState);
  const fileData = useRecoilValue(fileDataSelector);
  const fileName = useRecoilValue(fileNameSelector);
  const [selectedDataPath, setSelectedDataPath] = useRecoilState(
    fileSelectedDataPathSelector,
  );
  const data = useRecoilValue(dataSelector);

  const beforeUpload = (file) => {
    const reader = new FileReader();
    setSelectedDataPath(0);
    reader.onload = (e) => {
      const preparedFile = {
        ...convertFileToObject(file),
        data: JSON.parse(e.target.result.toString()),
      };
      setFile(preparedFile);
      StorageFile.set(preparedFile);
    };
    reader.readAsText(file);

    return false;
  };

  const onChange = (e) => {
    const pathValue = e.target.value;
    setSelectedDataPath(pathValue);
    StorageFile.setSelectedDataPath(pathValue);
  };

  const convertDataToSelect = (rawData, name) => {
    if (!rawData) {
      return null;
    }

    return (
      <S.SelectField>
        <Radio.Group onChange={onChange} value={selectedDataPath}>
          <Space direction="vertical">
            <Radio disabled={!(rawData instanceof Array)} value="this">
              <b>{name}</b>
            </Radio>

            {!(rawData instanceof Array) &&
              Object.entries(rawData).map(([key, value]) => (
                <Radio
                  disabled={!(value instanceof Array)}
                  value={key}
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
