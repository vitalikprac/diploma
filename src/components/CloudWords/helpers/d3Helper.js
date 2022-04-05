import d3Tip from 'd3-tip';
import * as d3Zoom from 'd3-zoom';

import { D3_TIP_DEFAULT_CLASSNAME } from './constants';

export const createTip = ({
  className = D3_TIP_DEFAULT_CLASSNAME,
  htmlTemplate,
}) => d3Tip().attr('class', className).offset([0, 0]).html(htmlTemplate);

export const createZoom = ({ element, setZoomLevel = () => {} }) =>
  d3Zoom.zoom().on('zoom', (e) => {
    setZoomLevel(e.transform.k);
    element.attr('transform', e.transform);
  });

export const appendZoom = ({ cloudElement, element }) => {
  cloudElement.call(element).on('dblclick.zoom', null);
};
