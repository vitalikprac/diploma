import { Switch } from 'antd';
import { useEffect, useRef, useState } from 'react';

import pdl from '../../data/PDL-03-10-2022.json';

import { createRoot } from './d3Helper';
import { prepareDataset } from './dataHelper';
import { hierarchy } from './helpers';
import { drawHierarchicalEdge } from './hierarchicalEdgeHelper';
import * as S from './HierarchicalEdge.styled';

const { preparedDataset, mappedDataset } = prepareDataset(pdl.dataset);
const data = hierarchy(preparedDataset);
const root = createRoot(data);

const HierarchicalEdge = () => {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const selectedNodeRef = useRef({});

  const [isShowAll, setIsShowAll] = useState(true);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current?.remove?.();
    }

    const svg = drawHierarchicalEdge({
      selectedNode: selectedNodeRef.current,
      root,
      mappedDataset,
      renderAll: isShowAll,
    });
    const svgNode = svg.node();

    wrapperRef.current.appendChild(svgNode);

    svgRef.current = svgNode;
  }, [isShowAll]);

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.Settings>
        <S.SettingsTitle>Налаштування</S.SettingsTitle>
        <div>
          <span>Відобразти всі зв`язки</span>
          <Switch checked={isShowAll} onChange={setIsShowAll} />
        </div>
      </S.Settings>
    </S.Wrapper>
  );
};

export default HierarchicalEdge;
