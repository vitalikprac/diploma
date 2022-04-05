import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import pdl from '../../data/PDL-03-10-2022.json';
import test from '../../data/test.json';
import test2 from '../../data/test2.json';

import { bilink, hierarchy, id } from './helpers';
import * as S from './HierarchicalEdge.styled';

const dataset = pdl?.dataset.slice(0, 100);

console.log(dataset);

const mappedDataset = new Map(dataset.map((d) => [d.identifier, d]));

const keywords = new Map();

dataset.forEach((d) => {
  d.keyword.forEach((keyword) => {
    if (!keywords.has(keyword)) {
      keywords.set(keyword, [d.identifier]);
    } else {
      keywords.set(keyword, [...keywords.get(keyword), d.identifier]);
    }
  });
});

console.log(keywords);

const getRelativePublications = (publication) => [
  ...new Set(
    publication.keyword
      .map((keyword) => keywords.get(keyword))
      .flat()
      .filter((x) => x !== publication.title),
  ),
];

const mainEdge = [
  {
    name: 'publications',
    children: [],
  },
];

const t = dataset.map((x) => {
  const relative = getRelativePublications(x).filter((x) => x !== x.identifier);
  return {
    name: x.identifier,
    imports: relative.map((y) => `publications.${y}`),
  };
});

mainEdge[0].children = t;

console.log(test.length);

const data = hierarchy(mainEdge);

const colorin = '#00f';
const colorout = '#f00';
const colornone = '#ccc';
// const width = 954;
// const radius = width/2;
const width = 1200;
const radius = width / 2;

const tree = d3.cluster().size([2 * Math.PI, radius - 100]);

const root = tree(
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

console.log(root);
const line = d3
  .lineRadial()
  .curve(d3.curveBundle.beta(0.85))
  .radius((d) => d.y)
  .angle((d) => d.x);

const svg = d3
  .create('svg')
  .attr('viewBox', [-width / 2, -width / 2, width, width]);

let lastSelectedNode = null;

const node = svg
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
  .text((d) => mappedDataset.get(d.data.name).title)
  .each(function (d) {
    d.text = this;
  })
  .on('click', function onClick(event, d) {
    if (lastSelectedNode) {
      outed.call(
        lastSelectedNode.node,
        lastSelectedNode.event,
        lastSelectedNode.d,
      );
    }
    lastSelectedNode = { node: this, event, d };
    overed.call(this, event, d);
  })
  /* .on('mouseover', overed)
  .on('mouseout', outed) */
  .call((text) =>
    text.append('title').text(
      (d) => `${id(d)}
${d.outgoing.length} outgoing
${d.incoming.length} incoming`,
    ),
  );

const link = svg
  .append('g')
  .attr('stroke', colornone)
  .attr('fill', 'none')
  .selectAll('path')
  .data(root.leaves().flatMap((leaf) => leaf.outgoing))
  .join('path')
  .style('mix-blend-mode', 'multiply')
  .attr('d', ([i, o]) => line(i.path(o)))
  .each(function (d) {
    d.path = this;
  });

function overed(event, d) {
  link.style('mix-blend-mode', null);
  d3.select(this).attr('font-weight', 'bold');
  d3.selectAll(d.incoming.map((d) => d.path))
    .attr('stroke', colorin)
    .raise();
  d3.selectAll(d.incoming.map(([d]) => d.text))
    .attr('fill', colorin)
    .attr('font-weight', 'bold');
  d3.selectAll(d.outgoing.map((d) => d.path))
    .attr('stroke', colorout)
    .raise();
  d3.selectAll(d.outgoing.map(([, d]) => d.text))
    .attr('fill', colorout)
    .attr('font-weight', 'bold');
}

function outed(event, d) {
  link.style('mix-blend-mode', 'multiply');
  d3.select(this).attr('font-weight', null);
  d3.selectAll(d.incoming.map((d) => d.path)).attr('stroke', null);
  d3.selectAll(d.incoming.map(([d]) => d.text))
    .attr('fill', null)
    .attr('font-weight', null);
  d3.selectAll(d.outgoing.map((d) => d.path)).attr('stroke', null);
  d3.selectAll(d.outgoing.map(([, d]) => d.text))
    .attr('fill', null)
    .attr('font-weight', null);
}

const HierarchicalEdge = () => {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  useEffect(() => {
    if (svgRef.current) {
      return;
    }
    const svgNode = svg.node();
    wrapperRef.current.appendChild(svgNode);
    svgRef.current = svgNode;
  }, []);

  return <S.Wrapper ref={wrapperRef} />;
};

export default HierarchicalEdge;
