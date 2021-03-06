import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../../../components/ErrorFallback';
import HierarchicalEdge from '../../../components/HierarchicalEdge/HierarchicalEdge';

import * as S from './ViewData.styled';

const ViewData = () => (
  <S.Wrapper>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HierarchicalEdge />
    </ErrorBoundary>
  </S.Wrapper>
);

export default ViewData;
