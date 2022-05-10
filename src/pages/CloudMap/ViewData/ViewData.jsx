import { useRecoilValue } from 'recoil';

import CloudWords from '../../../components/CloudWords';
import { dataSelector } from '../../../recoil/recoil';

import * as S from './ViewData.styled';

const ViewData = () => {
  const data = useRecoilValue(dataSelector);

  const width = document.body.clientWidth - 500;
  const height = document.body.clientHeight - 200;
  return (
    <S.Wrapper>
      <CloudWords id="cloud-full" height={height} width={width} data={data} />
    </S.Wrapper>
  );
};

export default ViewData;
