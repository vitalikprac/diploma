import { atom, selector } from 'recoil';

import { HierarchicalStorage } from '../../utils/storageHelper';

const DEFAULT_CONNECTION_FUNCTION = `function connectionFunction(firstElement, secondElement){
  return firstElement.keyword.some((keyword1) => secondElement.keyword.includes(keyword1));
}`;

const HIERARCHICAL_STATE_DEFAULT = {
  identifierField: '',
  displayField: '',
  additionalFields: [],
  connectionFunction: DEFAULT_CONNECTION_FUNCTION,
  maxElements: 100,
};

const defaultHierarchical =
  HierarchicalStorage.get() || HIERARCHICAL_STATE_DEFAULT;
const {
  identifierField,
  displayField,
  connectionFunction,
  maxElements,
  additionalFields,
} = defaultHierarchical;

export const identifierFieldState = atom({
  key: 'hierarchical.identifierField',
  default: identifierField,
});

export const displayFieldState = atom({
  key: 'hierarchical.displayField',
  default: displayField,
});

export const additionalFieldsState = atom({
  key: 'hierarchical.additionalFields',
  default: additionalFields,
});

export const maxElementsState = atom({
  key: 'hierarchical.maxElements',
  default: maxElements,
});

export const connectionFunctionState = atom({
  key: 'hierarchical.connectionFunction',
  default: connectionFunction,
});

export const connectionFunctionEvaluatedState = selector({
  key: 'hierarchical.connectionFunctionEvaluated',
  // eslint-disable-next-line no-new-func
  get: ({ get }) => new Function(`return ${get(connectionFunctionState)}`)(),
});

export const hierarchicalState = selector({
  key: 'hierarchical.hierarchicalEdgeBundling',
  default: defaultHierarchical,
  get: ({ get }) => ({
    identifierField: get(identifierFieldState),
    displayField: get(displayFieldState),
    connectionFunction: get(connectionFunctionState),
    maxElements: get(maxElementsState),
  }),
});
