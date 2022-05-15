import { RESET_HELPER_FILE_DATA } from './resetHelperFileData';
import {
  CloudMapStorage,
  HeatMapStorage,
  HierarchicalStorage,
  StorageFile,
  StorageHome,
} from './storageHelper';

export const resetDemo = ({
  setCloudMapState,
  setHeatMapState,
  setHierarchicalStateState,
  setViewState,
}) => {
  CloudMapStorage.set({
    displayField: 'title',
    sizeFunction:
      'function prepare(item){\n    return item.description.length;\n}',
    additionalFields: [
      'title',
      'description',
      'modified',
      'accessLevel',
      'identifier',
      'license',
    ],
  });
  setCloudMapState(CloudMapStorage.get());
  HierarchicalStorage.set({
    identifierField: 'identifier',
    displayField: 'title',
    connectionFunction:
      'function connectionFunction(firstElement, secondElement){\n  return firstElement.keyword.some((keyword1) => secondElement.keyword.includes(keyword1));\n}',
    maxElements: 100,
    additionalFields: [
      'title',
      'description',
      'modified',
      'accessLevel',
      'identifier',
      'license',
    ],
  });
  setHierarchicalStateState(HierarchicalStorage.get());
  HeatMapStorage.set({
    sizeFunction:
      'function prepare(item){\n    return item.description.length\n}',
    hoverFunction:
      // eslint-disable-next-line no-template-curly-in-string
      'function prepare(item){\n    return `Довжина test опису публікації ${item}`;\n}',
    color: { from: 'white', to: '#0007b7' },
    additionalFields: [
      'title',
      'modified',
      'accessLevel',
      'license',
      'identifier',
    ],
  });
  setHeatMapState(HeatMapStorage.get());

  StorageHome.set({ keyField: 'identifier', fields: ['title', 'modified'] });
  setViewState(StorageHome.get());

  StorageFile.set(RESET_HELPER_FILE_DATA).then((x) => {
    window.location.reload();
  });
};

export const resetDefault = () => {};
