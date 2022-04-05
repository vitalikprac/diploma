export const prepareDataset = (originalDataset) => {
  const dataset = originalDataset.slice(0, 100);
  const mappedDataset = new Map(dataset.map((d) => [d.identifier, d]));

  const keywords = new Map();

  dataset.forEach((d) => {
    d.keyword.forEach((keyword) => {
      if (!keywords.has(keyword)) {
        keywords.set(keyword, [d.identifier]);
      } else {
        keywords.set(keyword, [...keywords.get(keyword), d.identifier]);
      }
    });
  });

  const getRelativePublications = (publication) => [
    ...new Set(
      publication.keyword
        .map((keyword) => keywords.get(keyword))
        .flat()
        .filter((x) => x !== publication.title),
    ),
  ];

  const preparedDataset = [
    {
      name: 'publications',
      children: dataset.map((x) => {
        const relative = getRelativePublications(x).filter(
          (y) => y !== y.identifier,
        );
        return {
          name: x.identifier,
          imports: relative.map((y) => `publications.${y}`),
        };
      }),
    },
  ];

  return { preparedDataset, mappedDataset };
};
