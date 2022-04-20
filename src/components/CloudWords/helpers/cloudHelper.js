import * as d3 from 'd3';

import { appendZoom, createTip, createZoom } from './d3Helper';

const tip = createTip({
  htmlTemplate: (d, x) => `<div>${x.value.toFixed(0)}</div>`,
});

const DEFAULT_COLOR = 'black';
const HIGHLIGHT_COLOR = 'blue';
const SELECTED_COLOR = 'red';

export const drawCloud = ({
  id,
  layout,
  data,
  words,
  setZoomLevel,
  setCurrentObject,
  width,
  height,
  textField,
}) => {
  let lastHighlighted = null;

  const cloudElement = d3.select(`.${id}`).html('');
  cloudElement.call(tip);
  cloudElement.attr('viewBox', [-width / 2, -height / 2, width, height]);
  const g = cloudElement
    .attr('width', layout.size()[0])
    .attr('height', layout.size()[1])
    .append('g');

  const zoom = createZoom({
    element: g,
    setZoomLevel,
  });

  appendZoom({ cloudElement, element: zoom });

  g.selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', (d) => `${d.size}px`)
    .attr('text-anchor', 'middle')
    .attr('transform', (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
    .on('click', function onClick(e, d) {
      if (lastHighlighted) {
        lastHighlighted.style.fill = DEFAULT_COLOR;
      }

      lastHighlighted = this;
      lastHighlighted.style.fill = SELECTED_COLOR;

      const title = d.text;
      setCurrentObject(data.find((x) => x[textField] === title));
    })
    .on('mouseover', function mouseOver(e, d) {
      tip.show.call(this, e, d);
      if (this === lastHighlighted) {
        return;
      }
      this.style.fill = HIGHLIGHT_COLOR;
      this.style.cursor = 'pointer';
    })
    .on('mouseout', function mouseOut(e, d) {
      tip.hide.call(this, e, d);
      if (this === lastHighlighted) {
        return;
      }
      this.style.fill = DEFAULT_COLOR;
      this.style.stroke = 'unset';
    })
    .text((d) => d.text);
};
