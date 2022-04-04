import * as d3 from 'd3';
import cloud from 'd3-cloud';
import d3Tip from 'd3-tip';
import * as d3Zoom from 'd3-zoom';
import { useCallback, useEffect, useRef, useState } from 'react';

import Data from '../../data/PDL-03-10-2022.json';
import { remap } from '../../utils/math';

import { HEIGHT, WIDTH } from './constants';
import * as S from './Home.styled';

const { dataset: originalDataset } = Data;

const dataset = originalDataset; // .slice(0, 100);
console.log(dataset, 'LENGTH');
const descriptions = dataset.map((x) => x.description.length);
const lowestLength = Math.min(...descriptions);
const largestLength = Math.max(...descriptions);

const preparedData = dataset.map(({ identifier, title, description }) => ({
  text: title,
  size: remap(description.length, lowestLength, largestLength, 1, 15),
  value: description.length,
}));

const Home = () => {
  const layoutRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentObject, setCurrentObject] = useState(null);

  const draw = useCallback((layout, words) => {
    console.log('Drawing');

    let lastHighlighted = null;

    const cloudElement = d3.select('.cloud');

    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .offset([-1, 0])
      .html((d, x) => {
        d3.select('.d3-tip');
        return `<div>${x.value.toFixed(0)}</div>`;
      });

    cloudElement.call(tip);
    cloudElement.attr('viewBox', [-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT]);

    const g = cloudElement
      .attr('width', layout.size()[0])
      .attr('height', layout.size()[1])
      .append('g');

    const zoom = d3Zoom.zoom().on('zoom', (e) => {
      setZoomLevel(e.transform.k);
      g.attr('transform', e.transform);
    });

    cloudElement.call(zoom).on('dblclick.zoom', null);

    g.selectAll('text')
      .data(words)
      .enter()

      .append('text')
      .style('font-size', (d) => `${d.size}px`)
      .attr('text-anchor', 'middle')
      .attr('transform', (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
      .on('click', function onClick(e, d) {
        if (lastHighlighted) {
          lastHighlighted.style.fill = 'black';
        }

        lastHighlighted = this;
        lastHighlighted.style.fill = 'red';

        const title = d.text;
        setCurrentObject(dataset.find((x) => x.title === title));
      })
      .on('mouseover', function mouseOver(e, d) {
        tip.show.call(this, e, d);
        if (this === lastHighlighted) {
          return;
        }
        this.style.fill = 'blue';
        this.style.cursor = 'pointer';
      })
      .on('mouseout', function mouseOut(e, d) {
        tip.hide.call(this, e, d);
        if (this === lastHighlighted) {
          return;
        }
        this.style.fill = 'black';
        this.style.stroke = 'unset';
      })
      .text((d) => d.text);
    console.log('Drawing done');
  }, []);

  useEffect(() => {
    if (layoutRef.current) {
      return;
    }

    const layout = cloud()
      .size([WIDTH, HEIGHT])
      .words(preparedData)
      .padding(5)
      .rotate(0)
      .fontSize((d) => d.size);

    layout.on('end', (words) => {
      draw(layout, words);
    });

    layout.start();

    layoutRef.current = layout;
  }, []);

  const { identifier, title, description, modified } = currentObject || {};

  return (
    <S.Wrapper>
      <S.CloudWrapper>
        <S.SvgCloud />
      </S.CloudWrapper>
      <S.CloudDescription>
        <div>
          <b>Title</b> - {title}
        </div>
        <div>
          <b>Identifier</b> - {identifier}
        </div>
        <div>
          <b>Modified</b> - {modified}
        </div>
        <div>
          <b>Description length</b> - {description?.length}
        </div>
        <div>
          <b>Description</b> - {description}
        </div>

        {/* {JSON.stringify(currentObject, null, 4)} */}
      </S.CloudDescription>
    </S.Wrapper>
  );
};

export default Home;
