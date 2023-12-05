export const isNumeric = (input) => !isNaN(input);
export const isOrdered = (start, end) => parseInt(start) < parseInt(end);
export const isRangeValid = (range) =>
  range.length == 2 && range.every(isNumeric) && isOrdered(range[0], range[1]);
export const isSingleValid = (single) =>
  single.length == 1 && isNumeric(single[0]);

export const checkPagesScheme = (input) => {
  const inputs = input.split(',').map((x) => x.trim());

  inputs.forEach((x) => {
    if (!x) return false;
    const pages = x.split('-');
    if (!isSingleValid(pages) && !isRangeValid(pages)) return false;
  });
  return true;
};
