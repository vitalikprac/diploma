export const getCalculations = ({ data: rawData, sizeFunction }) => {
  const mapSize = Math.ceil(Math.sqrt(rawData.length));

  const xSize = Math.round(Math.sqrt(rawData.length));
  const ySize = xSize + (rawData.length - xSize ** 2 > 0 ? 1 : 0);

  const myGroups = new Array(xSize).fill(0).map((x, i) => i + 1);
  const myVars = new Array(ySize).fill(0).map((x, i) => i + 1);

  const data = rawData.map((x, i) => {
    const full = Math.floor(i / mapSize);
    const rest = i % mapSize;

    return {
      group: myGroups[full],
      variable: myVars[rest],
      value: sizeFunction(x),
    };
  });

  const mappedValues = rawData.map(sizeFunction);
  const min = Math.min(...mappedValues);
  const max = Math.max(...mappedValues);

  return { myGroups, myVars, data, min, max };
};
