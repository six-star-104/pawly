import * as style from "./Pagination.style";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pageGroup = Math.ceil(currentPage / 10);
  const lastPage = pageGroup * 10 > totalPages ? totalPages : pageGroup * 10;
  const firstPage = lastPage - 9 <= 0 ? 1 : lastPage - 9;

  return (
    <style.Container>
      <style.PageButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        {"<<"}
      </style.PageButton>
      <style.PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </style.PageButton>
      {[...Array(lastPage - firstPage + 1)].map((_, index) => {
        const pageNumber = firstPage + index;
        return (
          <style.PageButton
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            $active={pageNumber === currentPage}
          >
            {pageNumber}
          </style.PageButton>
        );
      })}
      <style.PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </style.PageButton>
      <style.PageButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {">>"}
      </style.PageButton>
    </style.Container>
  );
};

export default Pagination;
