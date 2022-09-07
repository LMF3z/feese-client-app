import { useState } from 'react';
import { limitResultRequest } from '../../../constants';

const usePaginate = () => {
  const [numPages, setNumPages] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const [actualOffset, setActualOffset] = useState(0);

  const setPages = (count) => {
    setNumPages(Math.ceil(count / limitResultRequest));
  };

  const handleNextPage = () => {
    setActualPage(actualPage + 1);
    setActualOffset(actualOffset + 10);
  };

  const handlePreviewsPage = () => {
    setActualPage(actualPage - 1);
    setActualOffset(actualOffset - 10);
  };

  // * ---------------------------------------
  // * numbero total de resultados
  const [totalItems, setTotalItems] = useState(0);
  // * numero de paginas
  const [pageCount, setPageCount] = useState(0);
  // * offset actual
  const [offset, setOffset] = useState(0);

  const SetNumPages = (count) => {
    setPageCount(Math.ceil(count / limitResultRequest));
    setTotalItems(count);
  };

  const handleChangePage = (indexPage) => {
    const newOffset = (indexPage * limitResultRequest) % totalItems;
    setOffset(newOffset);
  };

  return {
    numPages,
    actualPage,
    actualOffset,
    setPages,
    handleNextPage,
    handlePreviewsPage,

    // * ---------------------------------------
    SetNumPages,
    pageCount,
    handleChangePage,
    offset,
  };
};

export default usePaginate;
