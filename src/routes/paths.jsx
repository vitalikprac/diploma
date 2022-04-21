import CloudMap from '../pages/CloudMap';
import HeatDemo from '../pages/HeatDemo';
import HierarchicalEdgeBundling from '../pages/HierarchicalEdgeBundling';
import Home from '../pages/Home';

export const HOME = '/home';
export const CLOUD_MAP = '/cloud-map';
export const HIERARCHICAL_EDGE_BUNDLING = '/hierarchical-edge-bundling';
export const HEAT_MAP = '/heat-map';

export const PAGES = [
  {
    id: HOME,
    path: HOME,
    element: <Home />,
    title: 'Підготовка',
  },
  {
    id: CLOUD_MAP,
    path: CLOUD_MAP,
    element: <CloudMap />,
    title: 'Хмара тегів',
    needData: true,
  },
  {
    id: HIERARCHICAL_EDGE_BUNDLING,
    path: HIERARCHICAL_EDGE_BUNDLING,
    element: <HierarchicalEdgeBundling />,
    title: 'Ієрархічне об’єднання меж',
    needData: true,
  },
  {
    id: HEAT_MAP,
    path: HEAT_MAP,
    element: <HeatDemo />,
    title: 'Теплокарта',
    needData: true,
  },
];
