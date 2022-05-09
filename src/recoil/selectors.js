import { selector } from 'recoil';

import { fileState } from './atoms';

export const fileNameSelector = selector({
  key: 'fileNameState',
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
  key: 'dataState',
  get: ({ get }) => {
    const file = get(fileState);
    return file?.data?.[file?.selectedDataPath];
  },
});
