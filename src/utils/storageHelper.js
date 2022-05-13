import localforage from 'localforage';

const getByKey = (key) => JSON.parse(localStorage.getItem(key) || 'null');
const setByKey = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const StorageFile = {
  async get() {
    return localforage.getItem('file');
  },
  async set(data) {
    return localforage.setItem('file', data);
  },
  async setSelectedDataPath(path) {
    const file = await this.get();
    file.selectedDataPath = path;
    await this.set(file);
  },
};

export const CloudMapStorage = {
  get() {
    return getByKey('cloudMap');
  },
  set(data) {
    return setByKey('cloudMap', data);
  },
};

export const HeatMapStorage = {
  get() {
    return getByKey('heatMap');
  },
  set(data) {
    return setByKey('heatMap', data);
  },
};

export const HierarchicalStorage = {
  get() {
    return getByKey('hierarchical');
  },
  set(data) {
    return setByKey('hierarchical', data);
  },
};

export const StorageHome = {
  get() {
    return getByKey('home');
  },
  set(data) {
    return setByKey('home', data);
  },
};
