export const saveStorageData = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
};

export const readStorageData = () =>
  JSON.parse(localStorage.getItem('data') || 'null');
