import { useContext } from 'react';
import { useRecoilValue } from 'recoil';

import CloudWords from '../../../components/CloudWords';
import { CloudMapContext } from '../../../context/CloudMapContext';
import { dataSelector } from '../../../recoil/selectors';

import * as S from './ViewData.styled';

const ViewData = () => {
  const data = useRecoilValue(dataSelector);
  const { displayField, sizeFunction } = useContext(CloudMapContext);

  const width = document.body.clientWidth - 500;
  const height = document.body.clientHeight - 200;
  return (
    <S.Wrapper>
      <CloudWords
        id="cloud-full"
        height={height}
        width={width}
        data={data}
        displayField={displayField}
        sizeFunction={sizeFunction}
      />
    </S.Wrapper>
  );
};

export default ViewData;
