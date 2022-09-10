export const calculatePageCount = (totalCount: number, rowsPerPage: number) => {
  let calculatedPageCount = 1;

  if (totalCount >= rowsPerPage) {
    calculatedPageCount = Math.ceil(totalCount / rowsPerPage);
  }
  return calculatedPageCount;
};
