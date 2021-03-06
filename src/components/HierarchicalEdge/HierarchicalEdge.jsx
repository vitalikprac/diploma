import { Switch } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  additionalFieldsState,
  connectionFunctionEvaluatedState,
  displayFieldState,
  identifierFieldState,
  maxElementsState,
} from '../../pages/HierarchicalEdgeBundling/recoil';
import { dataSelector } from '../../recoil/recoil';

import { createRoot } from './d3Helper';
import { prepareDataset } from './dataHelper';
import { hierarchy } from './helpers';
import { drawHierarchicalEdge } from './hierarchicalEdgeHelper';
import * as S from './HierarchicalEdge.styled';

const HierarchicalEdge = () => {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const selectedNodeRef = useRef({});

  const [isShowAll, setIsShowAll] = useState(true);
  const [isHideEmpty, setIsHideEmpty] = useState(false);

  const dataset = useRecoilValue(dataSelector);
  const identifierField = useRecoilValue(identifierFieldState);
  const displayField = useRecoilValue(displayFieldState);
  const connectionFunction = useRecoilValue(connectionFunctionEvaluatedState);
  const maxElements = useRecoilValue(maxElementsState);
  const additionalFields = useRecoilValue(additionalFieldsState);
  const [currentObject, setCurrentObject] = useState({});

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current?.remove?.();
    }

    const { preparedDataset, mappedDataset } = prepareDataset({
      dataset,
      maxElements,
      hideEmpty: isHideEmpty,
      identifyFunc: (x) => x[identifierField],
      connectionFunction,
    });
    const data = hierarchy(preparedDataset);
    const root = createRoot(data);

    const svg = drawHierarchicalEdge({
      selectedNode: selectedNodeRef.current,
      setCurrentObject,
      displayField,
      root,
      mappedDataset,
      renderAll: isShowAll,
    });
    const svgNode = svg.node();

    wrapperRef.current.appendChild(svgNode);

    svgRef.current = svgNode;
  }, [
    isShowAll,
    dataset,
    identifierField,
    connectionFunction,
    maxElements,
    isHideEmpty,
    displayField,
  ]);

  return (
    <S.Wrapper ref={wrapperRef}>
      {Object.keys(currentObject).length > 0 && (
        <S.Selected>
          <h4>???????????????? ??????????????</h4>
          {additionalFields.map((field) => (
            <div key={field}>
              <b>{field}</b> - {currentObject?.[field]}
            </div>
          ))}
        </S.Selected>
      )}
      <S.Settings>
        <S.SettingsTitle>????????????????????????</S.SettingsTitle>
        <S.SettingsColumn>
          <div>???????????????????? ?????? ????`????????</div>
          <Switch checked={isShowAll} onChange={setIsShowAll} />
        </S.SettingsColumn>
        <S.SettingsColumn>
          <div>?????????????? ?????????? ????`????????</div>
          <Switch checked={isHideEmpty} onChange={setIsHideEmpty} />
        </S.SettingsColumn>
      </S.Settings>
    </S.Wrapper>
  );
};

export default HierarchicalEdge;
