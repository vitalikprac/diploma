import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../../components/ErrorFallback';
import HierarchicalEdge from '../../components/HierarchicalEdge/HierarchicalEdge';

import * as S from './HierarchicalEdgeBundling.styled';

const HierarchicalEdgeBundling = () => (
  <S.Wrapper>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HierarchicalEdge />
    </ErrorBoundary>
  </S.Wrapper>
);

export default HierarchicalEdgeBundling;
