import cloud from 'd3-cloud';
import { useEffect, useRef, useState } from 'react';

import { drawCloud } from './helpers/cloudHelper';
import { HEIGHT, WIDTH } from './helpers/constants';

export const useCloud = ({ words, data }) => {
  const layoutRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentObject, setCurrentObject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (layoutRef.current) {
      return;
    }
    const layout = cloud()
      .size([WIDTH, HEIGHT])
      .words(words)
      .padding(5)
      .rotate(0)
      .fontSize((d) => d.size);
    layout.on('end', (preparedWords) => {
      setLoading(false);
      drawCloud({
        layout,
        words: preparedWords,
        data,
        setZoomLevel,
        setCurrentObject,
      });
    });
    setLoading(true);
    layout.start();
    layoutRef.current = layout;
  }, []);

  return { zoomLevel, currentObject, loading };
};
