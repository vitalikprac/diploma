import localforage from 'localforage';

// const getByKey = (key) => JSON.parse(localStorage.getItem(key) || 'null');
// const setByKey = (key, data) => localStorage.setItem(key, JSON.stringify(data));

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
