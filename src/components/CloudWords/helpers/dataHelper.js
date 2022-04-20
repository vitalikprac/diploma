import { remap } from '../../../utils/math';

export const prepareData = (data) => {
  const descriptions = data.map((x) => x.description.length);
  const lowestLength = Math.min(...descriptions);
  const largestLength = Math.max(...descriptions);

  const preparedData = data.map(({ title, description }) => ({
    text: title,
    size: remap(description.length, lowestLength, largestLength, 1, 15),
    value: description.length,
  }));

  return { dataset: data, preparedData };
};
