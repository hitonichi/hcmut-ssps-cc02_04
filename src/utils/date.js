export const formatDate = (date) => {
  return date.replaceAll('T', ' ').replaceAll('Z', ' ').split('.')[0];
};
