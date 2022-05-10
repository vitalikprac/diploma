import T from 'prop-types';
import { memo, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import {
  cloudMapState,
  sizeFunctionEvaluatedSelector,
} from '../../pages/CloudMap/recoil';

import { HEIGHT, WIDTH } from './helpers/constants';
import { prepareData } from './helpers/dataHelper';
import { useCloud } from './useCloud';
import * as S from './CloudWords.styled';

const CloudWords = memo(
  ({
    id = 'cloud',
    data,
    width = WIDTH,
    height = HEIGHT,
    defaultSize = 'yes',
  }) => {
    const { additionalFields, displayField } = useRecoilValue(cloudMapState);
    const sizeFunction = useRecoilValue(sizeFunctionEvaluatedSelector);

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
      textField: displayField,
    });

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
              {additionalFields.map((field) => (
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
  id: T.string,
  width: T.number,
  height: T.number,
  defaultSize: T.string,
};

export default CloudWords;
