import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';

import ErrorFallback from '../../../components/ErrorFallback';
import HeatMap from '../../../components/HeatMap';
import { dataSelector } from '../../../recoil/recoil';
import { heatMapState } from '../recoil';

import * as S from './ViewData.styled';

const ViewData = () => {
  const data = useRecoilValue(dataSelector);
  const { color } = useRecoilValue(heatMapState);

  return (
    <S.Wrapper>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HeatMap
          id="heatmap-full"
          data={data}
          size={{
            width: 800,
            height: 600,
          }}
          color={color}
        />
      </ErrorBoundary>
    </S.Wrapper>
  );
};

export default ViewData;
