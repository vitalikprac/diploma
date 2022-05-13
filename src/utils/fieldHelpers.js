export const convertToTreeData = (data) =>
  Object.entries(data)
    .map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        return {
          title: key,
          value: key,
        };
      }
      return null;
    })
    .filter(Boolean);
