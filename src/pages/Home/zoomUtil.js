import * as d3Zoom from 'd3-zoom';

export const createZoom = ({ element, setZoomLevel = () => {} }) => {
  const zoom = d3Zoom.zoom().on('zoom', (e) => {
    setZoomLevel(e.transform.k);
    element.attr('transform', e.transform);
  });

  return zoom;
};

export const appendZoom = ({ cloudElement, element }) => {
  cloudElement.call(element).on('dblclick.zoom', null);
};
