import T from 'prop-types';
import { memo, useContext, useEffect, useMemo } from 'react';

import { CloudMapContext } from '../../context/CloudMapContext';

import { HEIGHT, WIDTH } from './helpers/constants';
import { prepareData } from './helpers/dataHelper';
import { useCloud } from './useCloud';
import * as S from './CloudWords.styled';

const CloudWords = memo(
  ({
    id = 'cloud',
    data,
    displayField,
    sizeFunction,
    width = WIDTH,
    height = HEIGHT,
    defaultSize = 'yes',
  }) => {
    const { selectFields } = useContext(CloudMapContext);

    const { preparedData, dataset } = useMemo(
      () =>
        prepareData({
          data,
          textField: displayField,
          sizeFunction,
        }),
      [data, displayField, sizeFunction],
    );

    const { zoomLevel, currentObject, loading } = useCloud({
      id,
      words: preparedData,
      data: dataset,
      width,
      height,
    });
    const { identifier, title, description, modified } = currentObject || {};

    return (
      <S.Wrapper>
        <S.CloudWrapper width={width} height={height}>
          <S.ZoomHelper>Масштаб = {zoomLevel.toFixed(2)}</S.ZoomHelper>
          {loading ? <div>Loading</div> : <S.SvgCloud id={id} />}
        </S.CloudWrapper>
        <S.CloudDescription
          width={defaultSize === 'yes' ? `300px` : '100%'}
          height={height}
        >
          {currentObject ? (
            <>
              {selectFields.map((field) => (
                <div key={field}>
                  <b>{field}</b> - {currentObject[field]}
                </div>
              ))}
            </>
          ) : (
            <div>Елемент не вибраний!</div>
          )}
        </S.CloudDescription>
      </S.Wrapper>
    );
  },
);

CloudWords.propTypes = {
  data: T.arrayOf(T.shape({})).isRequired,
};

export default CloudWords;
