import T from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import CloudWords from '../../../components/CloudWords';
import { CloudMapContext } from '../../../context/CloudMapContext';
import { DataContext } from '../../../context/DataContext';

import * as S from './ViewData.styled';

const ViewData = () => {
  const { data } = useContext(DataContext);
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

ViewData.propTypes = {};

export default ViewData;
