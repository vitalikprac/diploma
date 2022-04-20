import cloud from 'd3-cloud';
import { useEffect, useRef, useState } from 'react';

import { drawCloud } from './helpers/cloudHelper';

export const useCloud = ({ words, data, id, width, height, textField }) => {
  const layoutRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentObject, setCurrentObject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const layout = cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(0)
      .fontSize((d) => d.size);
    layout.on('end', (preparedWords) => {
      setLoading(false);
      drawCloud({
        id,
        layout,
        words: preparedWords,
        data,
        setZoomLevel,
        setCurrentObject,
        width,
        height,
        textField,
      });
    });
    setLoading(true);
    layout.start();
    layoutRef.current = layout;
  }, [words, data]);

  return { zoomLevel, currentObject, loading };
};
