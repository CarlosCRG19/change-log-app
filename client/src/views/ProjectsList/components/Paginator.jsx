import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const Paginator = ({ currentPage, totalPages, onChange }) => {
  const paginationWindow = useMemo(() => {
    if (totalPages < 3) {
      return totalPages === 1 ? [1] : [1, 2];
    }

    if (currentPage === 1) {
      return [1, 2, 3];
    }

    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    onChange(page);
  };

  const goToFirstPage = () => {
    goToPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    goToPage(totalPages);
  };

  return (
    <Pagination className="mt-5 justify-content-center">
      <Pagination.First disabled={currentPage === 1} onClick={goToFirstPage} />
      <Pagination.Prev disabled={currentPage === 1} onClick={goToPreviousPage} />
      {paginationWindow.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => goToPage(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={currentPage === totalPages} onClick={goToNextPage} />
      <Pagination.Last disabled={currentPage === totalPages} onClick={goToLastPage} />
    </Pagination>
  );
};

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Paginator;
