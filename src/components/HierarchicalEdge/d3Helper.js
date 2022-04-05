import * as d3 from 'd3';

import { COLOR_IN, RADIUS } from './constants';
import { bilink } from './helpers';

export const line = d3
  .lineRadial()
  .curve(d3.curveBundle.beta(0.85))
  .radius((d) => d.y)
  .angle((d) => d.x);

export const createRoot = (data) => {
  const tree = d3.cluster().size([2 * Math.PI, RADIUS - 100]);

  return tree(
    bilink(
      d3
        .hierarchy(data)
        .sort(
          (a, b) =>
            d3.ascending(a.height, b.height) ||
            d3.ascending(a.data.name, b.data.name),
        ),
    ),
  );
};

export const overed = ({ element, d, link, renderAll }) => {
  link.style('mix-blend-mode', null);
  d3.select(element).attr('font-weight', 'bold');
  const all = d3
    .selectAll(d.incoming.map((x) => x.path))
    .attr('stroke', COLOR_IN);

  if (!renderAll) {
    all.attr('display', () => 'inline');
  }
  all.raise();

  d3.selectAll(d.incoming.map(([x]) => x.text))
    .attr('fill', COLOR_IN)
    .attr('font-weight', 'bold');
};

export const outed = ({ element, d, link, renderAll }) => {
  link.style('mix-blend-mode', 'multiply');
  d3.select(element).attr('font-weight', null);
  const all = d3.selectAll(d.incoming.map((x) => x.path)).attr('stroke', null);
  if (!renderAll) {
    all.attr('display', () => 'none');
  }

  d3.selectAll(d.incoming.map(([x]) => x.text))
    .attr('fill', null)
    .attr('font-weight', null);
};
