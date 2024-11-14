import {
  adminContainer,
  adminHeader,
  adminContent,
} from './styles';
import { useReportStore } from '@/stores/reportStore';
import { useEffect, useState } from 'react';
import { updateReportStatus } from '@/apis/reportService';
import ReportList from '@/components/ReportList';
import ReportPagination from '@/components/ReportPagination';
import { Theme } from '@/components/Theme';

export const Admin = () => {
  const { reports, fetchReports } = useReportStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState("ROLLING_PAPER");
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const pageSize = 1; 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setActionMessage(null);

      try {
        await fetchReports(category, 0, 1000); // 일단 한번에 다 가져오기
      } catch (err) {
        setError("신고 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchReports, category]);

  const filteredReports = reports.filter(report => report.status === "STANDBY");
  const totalPages = Math.ceil(filteredReports.length / pageSize);

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
      await fetchReports(category, 0, 1000);
    } catch (error) {
      setError(`신고 ID ${reportId} 처리 중 오류가 발생했습니다.`);
    }
  };

  // 현재 페이지에 해당하는 항목 가져오기
  const paginatedReports = filteredReports.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

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
          reports={paginatedReports} // 스탠바이만 전달하기
          isLoading={isLoading}
          error={error}
          handleReportAction={handleReportAction}
          actionMessage={actionMessage}
        />
        
        <ReportPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasReports={paginatedReports.length > 0}
        />
        
        <section>
          <Theme></Theme>
        </section>
      </main>
    
    </div>
  );
};
