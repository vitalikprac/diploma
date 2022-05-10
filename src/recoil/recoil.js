import { atom, selector } from 'recoil';

import { StorageFile } from '../utils/storageHelper';

export const fileState = atom({
  key: 'file',
  default: StorageFile.get(),
});

export const fileNameSelector = selector({
  key: 'fileName',
  get: ({ get }) => get(fileState)?.fileName,
});

export const fileDataSelector = selector({
  key: 'fileData',
  get: ({ get }) => get(fileState)?.data,
});

export const fileSelectedDataPathSelector = selector({
  key: 'fileSelectedDataPath',
  get: ({ get }) => get(fileState)?.selectedDataPath,
  set: ({ set }, value) => {
    set(fileState, (prev) => ({ ...prev, selectedDataPath: value }));
  },
});

export const dataSelector = selector({
  key: 'data',
  get: ({ get }) => {
    const file = get(fileState);
    return file?.data?.[file?.selectedDataPath];
  },
});
