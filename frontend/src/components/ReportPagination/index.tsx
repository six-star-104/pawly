// components/Pagination.tsx
import { paginationContainer, paginationButton } from './ReportPagination.styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  hasReports: boolean;
}

const ReportPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, hasReports }) => (
  <div css={paginationContainer}>
    <button
      css={paginationButton}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 0 || !hasReports}
    >
      이전
    </button>
    <span>
      페이지 {currentPage + 1} / {totalPages}
    </span>
    <button
      css={paginationButton}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages - 1 || !hasReports}
    >
      다음
    </button>
  </div>
);

export default ReportPagination;
