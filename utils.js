export const getGridTemplateAreas = (indices, number, separator = "'") => {
  return indices.reduce((str, indicesItem, index) => {
    if (!(index % number)) {
      str = `${str} ${separator}`;
    }
    str = `${str} tile${indicesItem}`;
    if (!((index + 1) % number)) {
      str = `${str} ${separator}`;
    }

    return str;
  }, '');
};
