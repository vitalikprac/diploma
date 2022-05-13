export const prepareDataset = ({
  dataset: originalDataset,
  maxElements,
  hideEmpty = false,
  identifyFunc,
  connectionFunction,
}) => {
  const dataset = maxElements
    ? originalDataset.slice(0, maxElements)
    : originalDataset;
  const connections = new Map();
  const mappedDataset = new Map(dataset.map((d) => [identifyFunc(d), d]));
  for (let i = 0; i < dataset.length; i += 1) {
    for (let j = 0; j < dataset.length; j += 1) {
      if (i !== j) {
        if (connectionFunction(dataset[i], dataset[j])) {
          const keyword = identifyFunc(dataset[i]);
          if (!connections.has(keyword)) {
            connections.set(keyword, [dataset[j]]);
          } else {
            connections.set(keyword, [...connections.get(keyword), dataset[j]]);
          }
        }
      }
    }
  }

  if (!hideEmpty) {
    for (let i = 0; i < dataset.length; i += 1) {
      if (!connections.has(identifyFunc(dataset[i]))) {
        connections.set(identifyFunc(dataset[i]), []);
      }
    }
  }

  const preparedDataset = [
    {
      name: 'connections',
      children: [...connections].map(([x, y]) => {
        const relative = y.map((a) => identifyFunc(a));
        return {
          name: x,
          imports: relative.map((a) => `connections.${a}`),
        };
      }),
    },
  ];

  return { mappedDataset, preparedDataset };
};
