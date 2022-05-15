import * as d3 from 'd3';

import { remap } from '../../utils/math';

const DRAW_AXIS = false;

export const drawHeatMap = ({
  id,
  size,
  data,
  myGroups,
  myVars,
  minP,
  maxP,
  min,
  max,
  fromColor,
  toColor,
  hoverFunction,
  rawData,
  setCurrentObject,
  ySize,
}) => {
  let localSelected = null;
  const { width, height } = size;
  const svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g');

  const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);
  const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
  if (DRAW_AXIS) {
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));
  }

  const myColor = d3
    .scaleLinear()
    .range([fromColor, toColor])
    .domain([minP, maxP]);

  const tooltip = d3
    .select(`#${id}`)
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('width', '100px')
    .style('pointer-events', 'none')
    .style('word-break', 'break-word');

  const mouseover = function mouseOver() {
    tooltip.style('opacity', 1);
    d3.select(this).style('stroke', 'grey');
  };
  const mousemove = function mouseMove(event, d) {
    const { height: h } = tooltip.node().getBoundingClientRect();
    tooltip
      .html(hoverFunction(d.value))
      .style('left', `${d3.pointer(event)[0]}px`)
      .style('top', `${d3.pointer(event)[1] - h - 10}px`);
  };
  const mouseleave = function mouseLeave() {
    tooltip.style('opacity', 0);
    if (localSelected !== this) {
      d3.select(this).style('stroke', 'none');
    }
  };

  svg
    .selectAll()
    .data(data, (d) => `${d.group}:${d.variable}`)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.group))
    .attr('y', (d) => y(d.variable))
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', (d) => myColor(remap(d.value, min, max, 0, 100)))
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .on('click', (e, d) => {
      if (localSelected) {
        d3.select(localSelected).style('stroke', 'none');
      }
      const [a, b] = [d.group - 1, d.variable - 1];
      setCurrentObject(rawData[a * ySize + b]);
      d3.select(e.target).style('stroke', 'black');
      localSelected = e.target;
    });

  return true;
};
