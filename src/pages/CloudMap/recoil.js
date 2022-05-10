import { atom, selector } from 'recoil';

import { CloudMapStorage } from '../../utils/storageHelper';

const DEFAULT_CLOUD_MAP_SIZE_FUNCTION = `function prepare(item){
    return item.description.length;
}`;

const cloudMapDefaultState = {
  displayField: '',
  sizeFunction: DEFAULT_CLOUD_MAP_SIZE_FUNCTION,
  additionalFields: [],
};

export const cloudMapState = atom({
  key: 'cloudMap',
  default: CloudMapStorage.get() || cloudMapDefaultState,
});

export const displayFieldSelector = selector({
  key: 'displayField',
  get: ({ get }) => get(cloudMapState).displayField,
  set: ({ get, set }, newValue) => {
    set(cloudMapState, {
      ...get(cloudMapState),
      displayField: newValue,
    });
  },
});

export const additionalFieldsSelector = selector({
  key: 'additionalFields',
  get: ({ get }) => get(cloudMapState).additionalFields,
  set: ({ get, set }, newValue) => {
    set(cloudMapState, {
      ...get(cloudMapState),
      additionalFields: newValue,
    });
  },
});

export const sizeFunctionSelector = selector({
  key: 'sizeFunctionSelector',
  get: ({ get }) => get(cloudMapState).sizeFunction,
  set: ({ get, set }, newValue) => {
    set(cloudMapState, {
      ...get(cloudMapState),
      sizeFunction: newValue,
    });
  },
});

export const sizeFunctionEvaluatedSelector = selector({
  key: 'sizeFunctionEvaluated',
  // eslint-disable-next-line no-new-func
  get: ({ get }) => new Function(`return ${get(sizeFunctionSelector)}`)(),
});
