import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { dataLoadingState, fileState } from '../recoil/atoms';
import { StorageFile } from '../utils/storageHelper';

export const RecoilPrepare = () => {
  const setFile = useSetRecoilState(fileState);
  const setDataLoading = useSetRecoilState(dataLoadingState);

  useEffect(() => {
    StorageFile.get().then((file) => {
      setFile(file);
      setDataLoading(false);
    });
  }, []);

  return null;
};
