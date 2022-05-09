export const convertFileToObject = (file) => ({
  uid: file.uid,
  lastModified: file.lastModified,
  lastModifiedDate: file.lastModifiedDate,
  name: file.name,
  size: file.size,
  type: file.type,
  webkitRelativePath: file.webkitRelativePath,
});
