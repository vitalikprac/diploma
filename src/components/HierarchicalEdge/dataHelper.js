const funcGetId = (d) => d.identifier;

const funcGetSameField = (d) => d.keyword;

export const prepareDataset = (originalDataset) => {
  const dataset = originalDataset.slice(0, 100);
  const mappedDataset = new Map(dataset.map((d) => [funcGetId(d), d]));

  const keywords = new Map();

  dataset.forEach((d) => {
    funcGetSameField(d).forEach((keyword) => {
      if (!keywords.has(keyword)) {
        keywords.set(keyword, [funcGetId(d)]);
      } else {
        keywords.set(keyword, [...keywords.get(keyword), funcGetId(d)]);
      }
    });
  });

  const getRelativePublications = (publication) => [
    ...new Set(
      funcGetSameField(publication)
        .map((keyword) => keywords.get(keyword))
        .flat()
        .filter((x) => x !== funcGetId(publication)),
    ),
  ];

  const preparedDataset = [
    {
      name: 'publications',
      children: dataset.map((x) => {
        const relative = getRelativePublications(x).filter(
          (y) => y !== funcGetId(y),
        );
        return {
          name: funcGetId(x),
          imports: relative.map((y) => `publications.${y}`),
        };
      }),
    },
  ];

  return { preparedDataset, mappedDataset };
};
