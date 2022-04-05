export const id = (node) =>
  `${node.parent ? `${id(node.parent)}.` : ''}${node.data.name}`;

export const hierarchy = (rawData, delimiter = '.') => {
  let root;
  const map = new Map();
  rawData.forEach(function find(data) {
    const { name } = data;
    if (map.has(name)) return map.get(name);
    const i = name.lastIndexOf(delimiter);
    map.set(name, data);
    if (i >= 0) {
      find({ name: name.substring(0, i), children: [] }).children.push(data);
      // eslint-disable-next-line no-param-reassign
      data.name = name.substring(i + 1);
    } else {
      root = data;
    }
    return data;
  });
  return root;
};

export const bilink = (root) => {
  const map = new Map(root.leaves().map((d) => [id(d), d]));
  // eslint-disable-next-line no-restricted-syntax
  for (const d of root.leaves()) {
    d.incoming = [];
    d.outgoing = d.data.imports.map((i) => [d, map.get(i)]);
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const d of root.leaves()) {
    // eslint-disable-next-line no-restricted-syntax
    for (const o of d.outgoing) {
      o[1].incoming.push(o);
    }
  }

  return root;
};
