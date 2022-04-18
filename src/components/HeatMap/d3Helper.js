import * as d3 from 'd3';

import { remap } from '../../utils/math';

const DRAW_AXIS = false;

export const drawHeatMap = ({
  size,
  data,
  myGroups,
  myVars,
  minP,
  maxP,
  min,
  max,
}) => {
  const { width, height, margin } = size;
  const svg = d3
    .select('#my_dataviz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

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
    .range(['white', '#0007b7'])
    .domain([minP, maxP]);

  const tooltip = d3
    .select('#my_dataviz')
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
    .style('pointer-events', 'none');

  const mouseover = function mouseOver() {
    tooltip.style('opacity', 1);
    d3.select(this).style('stroke', 'black');
  };
  const mousemove = function mouseMove(event, d) {
    const { height: h } = tooltip.node().getBoundingClientRect();
    tooltip
      .html(`Довжина опису публікації: ${d.value}`)
      .style('left', `${d3.pointer(event)[0]}px`)
      .style('top', `${d3.pointer(event)[1] - h - 10}px`);
  };
  const mouseleave = function mouseLeave() {
    tooltip.style('opacity', 0);
    d3.select(this).style('stroke', 'none');
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
    .on('mouseleave', mouseleave);

  return true;
};