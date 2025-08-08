type PaginationProps = {
  page: number;
  onChangePage: (page: number) => void;
  totalPages: number;
  limitSiblings?: number;
};

export const usePagination = ({
  page,
  onChangePage,
  totalPages,
  limitSiblings = 4
}: PaginationProps) => {
  const pageItemSiblings = 3;
  const totalItemsIsBiggerThanLimitSiblings =
    totalPages > limitSiblings + pageItemSiblings;
  const farFromStart =
    page > limitSiblings && totalItemsIsBiggerThanLimitSiblings;
  const farFromEnd =
    totalPages - page >= limitSiblings && totalItemsIsBiggerThanLimitSiblings;
  const elementsLimit = limitSiblings + 1;

  const allItemsArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const arrayFarFromStart = Array.from(
    { length: elementsLimit },
    (_, index) => index + 1
  );
  const arrayFarFromEnd = Array.from(
    { length: elementsLimit },
    (_, index) => totalPages - (elementsLimit - index - 1)
  );

  const handleSelectPageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isValidValue = value >= 1 && value <= totalPages;

    if (isValidValue) {
      handleChangePage(value);
      return;
    }
  };

  const handleChangePage = (page: number) => onChangePage(page);
  const handleGoBack = () => onChangePage(page === 1 ? 1 : page - 1);
  const handleGoForward = () =>
    onChangePage(page === totalPages ? totalPages : page + 1);

  return {
    page,
    limitSiblings,
    farFromStart,
    farFromEnd,
    allItemsArray,
    arrayFarFromStart,
    arrayFarFromEnd,
    handleChangePage,
    handleGoBack,
    handleGoForward,
    handleSelectPageInput
  };
};
