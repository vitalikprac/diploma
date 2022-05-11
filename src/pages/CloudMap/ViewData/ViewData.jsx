import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';

import CloudWords from '../../../components/CloudWords';
import ErrorFallback from '../../../components/ErrorFallback';
import { dataSelector } from '../../../recoil/recoil';

import * as S from './ViewData.styled';

const ViewData = () => {
  const data = useRecoilValue(dataSelector);

  const width = document.body.clientWidth - 500;
  const height = document.body.clientHeight - 200;
  return (
    <S.Wrapper>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CloudWords id="cloud-full" height={height} width={width} data={data} />
      </ErrorBoundary>
    </S.Wrapper>
  );
};

export default ViewData;
