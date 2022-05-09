import { atom } from 'recoil';

export const fileState = atom({
  key: 'fileState',
  default: null,
});

export const dataLoadingState = atom({
  key: 'dataLoading',
  default: true,
});
