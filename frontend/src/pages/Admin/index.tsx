import { ReportType } from '@/types/ReportTypes';
import {
  adminContainer,
  adminHeader,
  adminContent,
  adminBtnContainer,
} from './styles';
import { useReportStore } from '@/stores/reportStore';
import { useEffect, useState } from 'react';
import { updateReportStatus } from '@/apis/reportService';
import ReportList from '@/components/ReportList';
// import CompletedReports from '@/components/CompletedReports';
// import DeniedReports from '@/components/DeniedReports';
import Pagination from '@/components/ReportPagination';

export const Admin = () => {
  const { reports, totalReports, fetchReports } = useReportStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState("ROLLING_PAPER");
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [completedReports, setCompletedReports] = useState<ReportType[]>([]);
  const [deniedReports, setDeniedReports] = useState<ReportType[]>([]);
  const pageSize = 1;
  const totalPages = totalReports > 0 ? Math.ceil(totalReports / pageSize) : 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setActionMessage(null);

      try {
        await fetchReports(category, currentPage, pageSize);
      } catch (err) {
        setError("신고 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchReports, category, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    setCurrentPage(0);
  };

  const handleReportAction = async (reportId: number, confirmType: "COMPLETE" | "DENIED") => {
    try {
      const response = await updateReportStatus(reportId, confirmType);
      setActionMessage(`신고 ID ${reportId} 처리 결과: ${response.message}`);

      const updatedReports = reports.filter((report) => report.reportId !== reportId);
      if (confirmType === "COMPLETE") {
        const completedReport = reports.find((report) => report.reportId === reportId);
        if (completedReport) setCompletedReports((prev) => [...prev, completedReport]);
      } else if (confirmType === "DENIED") {
        const deniedReport = reports.find((report) => report.reportId === reportId);
        if (deniedReport) setDeniedReports((prev) => [...prev, deniedReport]);
      }
      await fetchReports(category, currentPage, pageSize);
    } catch (error) {
      setError(`신고 ID ${reportId} 처리 중 오류가 발생했습니다.`);
    }
  };

  return (
    <div css={adminContainer}>
      <header css={adminHeader}>
        <h2>관리자 페이지</h2>
      </header>
      <main css={adminContent}>
        <div>
          <label htmlFor="category-select">카테고리 선택: </label>
          <select id="category-select" value={category} onChange={handleCategoryChange}>
            <option value="ROLLING_PAPER">ROLLING_PAPER</option>
            <option value="LETTER">LETTER</option>
          </select>
        </div>
        
        <ReportList
          reports={reports}
          isLoading={isLoading}
          error={error}
          handleReportAction={handleReportAction}
          actionMessage={actionMessage}
        />
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasReports={reports.length > 0}
        />
        
        {/* <CompletedReports completedReports={completedReports} /> */}
        
        {/* <DeniedReports deniedReports={deniedReports} /> */}

        <section>
          <h2>테마 생성/수정/삭제</h2>
          <p>테마 생성/수정/삭제</p>
        </section>
      </main>
      <div css={adminBtnContainer}>
        {/* <button>저장</button>
        <button>취소</button> */}
      </div>
    </div>
  );
};
