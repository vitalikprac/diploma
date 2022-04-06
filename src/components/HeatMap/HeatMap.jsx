import { Slider } from 'antd';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

import demoData from '../../data/demoData';
import pdl from '../../data/PDL-03-10-2022.json';
import { remap } from '../../utils/math';

import * as S from './HeatMap.styled';

const WIDTH = 800;
const HEIGHT = 600;

const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const width = WIDTH - margin.left - margin.right;
const height = HEIGHT - margin.top - margin.bottom;

const getCalculations = (rawData) => {
  const mapSize = Math.ceil(Math.sqrt(rawData.length));

  const xSize = Math.round(Math.sqrt(rawData.length));
  const ySize = xSize + (rawData.length - xSize ** 2 > 0 ? 1 : 0);

  const myGroups = new Array(xSize).fill(0).map((x, i) => i + 1);
  const myVars = new Array(ySize).fill(0).map((x, i) => i + 1);

  const getValue = (value) => value.description.length;

  const data = rawData.map((x, i) => {
    const full = Math.floor(i / mapSize);
    const rest = i % mapSize;

    return {
      group: myGroups[full],
      variable: myVars[rest],
      value: getValue(x),
    };
  });

  const mappedValues = rawData.map(getValue);
  const min = Math.min(...mappedValues);
  const max = Math.max(...mappedValues);

  return { myGroups, myVars, data, min, max };
};

const drawHeatMap = ({ data, myGroups, myVars, minP, maxP, min, max }) => {
  const svg = d3
    .select('#my_dataviz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);
  /* svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x)); */

  const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
  /* svg.append('g').call(d3.axisLeft(y)); */

  // Build color scale
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

  const mouseover = function () {
    tooltip.style('opacity', 1);
    d3.select(this).style('stroke', 'black');
  };
  const mousemove = function (event, d) {
    const { height: h, width: w } = tooltip.node().getBoundingClientRect();
    tooltip
      .html(`Довжина опису публікації: ${d.value}`)
      .style('left', `${d3.pointer(event)[0]}px`)
      .style('top', `${d3.pointer(event)[1] - h - 10}px`);
  };
  const mouseleave = function (d) {
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

const HeatMap = () => {
  const renderRef = useRef(null);
  const svgRef = useRef(null);

  const [rangeValue, setRangeValue] = useState([0, 100]);
  const [rangeDebouncedValue, setRangeDebouncedValue] = useState([0, 100]);

  useEffect(() => {
    const element = svgRef.current;
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }

    const calculations = getCalculations(pdl.dataset);
    renderRef.current = drawHeatMap({
      ...calculations,
      minP: rangeValue[0],
      maxP: rangeValue[1],
    });
  }, [rangeDebouncedValue]);

  return (
    <S.Wrapper>
      <S.Slider
        onChange={setRangeValue}
        onAfterChange={setRangeDebouncedValue}
        range
        value={rangeValue}
        min={0}
        max={100}
      />
      <S.SvgContainer ref={svgRef} id="my_dataviz" />
    </S.Wrapper>
  );
};

export default HeatMap;
