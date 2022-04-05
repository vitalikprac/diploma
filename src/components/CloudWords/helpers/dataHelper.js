import { remap } from '../../../utils/math';

export const prepareData = (rawData) => {
  const { dataset: originalDataset } = rawData;

  const dataset = originalDataset;
  const descriptions = dataset.map((x) => x.description.length);
  const lowestLength = Math.min(...descriptions);
  const largestLength = Math.max(...descriptions);

  const preparedData = dataset.map(({ title, description }) => ({
    text: title,
    size: remap(description.length, lowestLength, largestLength, 1, 15),
    value: description.length,
  }));

  return { dataset, preparedData };
};
