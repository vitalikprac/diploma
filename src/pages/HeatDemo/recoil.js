import { atom, selector } from 'recoil';

import { HeatMapStorage } from '../../utils/storageHelper';

const DEFAULT_HEAT_MAP_SIZE_FUNCTION = `function prepare(item){
    return item.description.length;
}`;

const DEFAULT_HEAT_MAP_HOVER_FUNCTION = `function prepare(item){
    return \`Довжина опису публікації \${item}\`;
}`;

const heatMapDefaultState = {
  sizeFunction: DEFAULT_HEAT_MAP_SIZE_FUNCTION,
  hoverFunction: DEFAULT_HEAT_MAP_HOVER_FUNCTION,
  additionalFields: [],
  color: {
    from: 'white',
    to: '#0007b7',
  },
};

export const heatMapState = atom({
  key: 'heatMap',
  default: HeatMapStorage.get() || heatMapDefaultState,
});

export const sizeFunctionSelector = selector({
  key: 'heatMapSizeFunction',
  get: ({ get }) => get(heatMapState).sizeFunction,
  set: ({ get, set }, newValue) => {
    set(heatMapState, {
      ...get(heatMapState),
      sizeFunction: newValue,
    });
  },
});

export const additionalFieldsSelector = selector({
  key: 'heatMapAdditionalFields',
  get: ({ get }) => get(heatMapState).additionalFields,
  set: ({ get, set }, newValue) => {
    set(heatMapState, {
      ...get(heatMapState),
      additionalFields: newValue,
    });
  },
});

export const sizeFunctionEvaluatedSelector = selector({
  key: 'heatMapSizeFunctionEvaluated',
  // eslint-disable-next-line no-new-func
  get: ({ get }) => new Function(`return ${get(sizeFunctionSelector)}`)(),
});

export const hoverFunctionSelector = selector({
  key: 'heatMapHoverFunction',
  get: ({ get }) => get(heatMapState).hoverFunction,
  set: ({ get, set }, newValue) => {
    set(heatMapState, {
      ...get(heatMapState),
      hoverFunction: newValue,
    });
  },
});

export const hoverFunctionEvaluatedSelector = selector({
  key: 'heatMapHoverFunctionEvaluated',
  // eslint-disable-next-line no-new-func
  get: ({ get }) => new Function(`return ${get(hoverFunctionSelector)}`)(),
});
