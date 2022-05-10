import { atom, selector } from 'recoil';

import { StorageHome } from '../../utils/storageHelper';

const DEFAULT_VIEW_VALUE = {
  keyField: '',
  fields: [],
};

export const viewState = atom({
  key: 'view',
  default: StorageHome.get() || DEFAULT_VIEW_VALUE,
});

export const viewKeyFieldSelector = selector({
  key: 'viewKeyField',
  get: ({ get }) => get(viewState).keyField,
  set: ({ get, set }, newValue) =>
    set(viewState, { ...get(viewState), keyField: newValue }),
});

export const viewFieldsSelector = selector({
  key: 'viewFields',
  get: ({ get }) => get(viewState).fields,
  set: ({ get, set }, newValue) =>
    set(viewState, { ...get(viewState), fields: newValue }),
});
