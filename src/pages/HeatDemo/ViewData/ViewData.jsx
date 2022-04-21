import { useContext } from 'react';

import HeatMap from '../../../components/HeatMap';
import { DataContext } from '../../../context/DataContext';
import { HeatMapContext } from '../../../context/HeatMapContext';

import * as S from './ViewData.styled';

const ViewData = () => {
  const { data } = useContext(DataContext);
  const { sizeFunction, color, hoverFunction } = useContext(HeatMapContext);

  return (
    <S.Wrapper>
      <HeatMap
        id="heatmap-full"
        data={data}
        sizeFunction={sizeFunction}
        hoverFunction={hoverFunction}
        size={{
          width: 800,
          height: 600,
        }}
        color={color}
      />
    </S.Wrapper>
  );
};

export default ViewData;
