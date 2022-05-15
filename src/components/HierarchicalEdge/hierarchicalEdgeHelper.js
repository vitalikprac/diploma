import * as d3 from 'd3';

import { appendZoom, createZoom } from '../CloudWords/helpers/d3Helper';

import { COLOR_NONE, VIEW_BOX } from './constants';
import { line, outed, overed } from './d3Helper';

export const drawHierarchicalEdge = ({
  displayField,
  selectedNode,
  setCurrentObject,
  root,
  mappedDataset,
  renderAll,
}) => {
  const svg = d3.create('svg').attr('viewBox', VIEW_BOX);
  const group = svg.append('g');
  const zoom = createZoom({
    element: group,
  });

  appendZoom({ cloudElement: svg, element: zoom });

  const link = group
    .append('g')
    .attr('stroke', COLOR_NONE)
    .attr('fill', 'none')
    .selectAll('path')
    .data(root.leaves().flatMap((leaf) => leaf.outgoing))
    .join('path')
    .style('mix-blend-mode', 'multiply')
    .attr('d', ([i, o]) => line(i.path(o)))
    .attr('display', () => {
      if (renderAll) {
        return 'unset';
      }
      return 'none';
    })
    .each(function each(x) {
      // eslint-disable-next-line no-param-reassign
      x.path = this;
    });

  group
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr(
      'transform',
      (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`,
    )
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', (d) => (d.x < Math.PI ? 6 : -6))
    .attr('text-anchor', (d) => (d.x < Math.PI ? 'start' : 'end'))
    .attr('transform', (d) => (d.x >= Math.PI ? 'rotate(180)' : null))
    .text((d) => mappedDataset.get(d.data.name)[displayField])
    .each(function each(x) {
      // eslint-disable-next-line no-param-reassign
      x.text = this;
    })
    .on('click', function onClick(event, d) {
      if (selectedNode?.element) {
        outed({ ...selectedNode, link, renderAll });
      }
      Object.assign(selectedNode, {
        element: this,
        d,
      });
      setCurrentObject(mappedDataset.get(d.data.name));
      overed({ element: this, d, link, renderAll });
    })
    .call((text) =>
      text.append('title').text(
        (d) => `${mappedDataset.get(d.data.name)[displayField]}
${d.incoming.length} зв'язків`,
      ),
    );

  return svg;
};
