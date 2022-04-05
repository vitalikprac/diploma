import Data from '../../data/PDL-03-10-2022.json';

import { prepareData } from './helpers/dataHelper';
import { useCloud } from './useCloud';
import * as S from './CloudWords.styled';

const { preparedData, dataset } = prepareData(Data);

const CloudWords = () => {
  const { zoomLevel, currentObject, loading } = useCloud({
    words: preparedData,
    data: dataset,
  });
  const { identifier, title, description, modified } = currentObject || {};
  return (
    <S.Wrapper>
      <S.CloudWrapper>
        <S.ZoomHelper>Масштаб = {zoomLevel.toFixed(2)}</S.ZoomHelper>
        {loading ? <div>Loading</div> : <S.SvgCloud />}
      </S.CloudWrapper>
      <S.CloudDescription>
        {currentObject ? (
          <>
            <div>
              <b>Опис</b> - {title}
            </div>
            <div>
              <b>Ідентифікатор</b> - {identifier}
            </div>
            <div>
              <b>Редаговано</b> - {modified}
            </div>
            <div>
              <b>Довжина опису</b> - {description?.length}
            </div>
            <div>
              <b>Опис</b> - {description}
            </div>
          </>
        ) : (
          <div>Елемент не вибраний!</div>
        )}
      </S.CloudDescription>
    </S.Wrapper>
  );
};

export default CloudWords;
