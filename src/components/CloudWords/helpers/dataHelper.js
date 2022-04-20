import { remap } from '../../../utils/math';

export const prepareData = ({ data, textField, sizeFunction }) => {
  const descriptions = data.map((x) => sizeFunction(x));
  const lowestLength = Math.min(...descriptions);
  const largestLength = Math.max(...descriptions);

  const preparedData = data.map((x) => ({
    text: x[textField],
    size: remap(sizeFunction(x), lowestLength, largestLength, 1, 15),
    value: sizeFunction(x),
  }));

  return { dataset: data, preparedData };
};
