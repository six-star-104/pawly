// components/ReportList.tsx
import { reportList, loader } from './ReportList.styles';
import { ReportType } from '@/types/ReportTypes';

interface ReportListProps {
  reports: ReportType[];
  isLoading: boolean;
  error: string | null;
  handleReportAction: (reportId: number, confirmType: "COMPLETE" | "DENIED") => void;
  actionMessage: string | null;
}

const ReportList: React.FC<ReportListProps> = ({
  reports,
  isLoading,
  error,
  handleReportAction,
  actionMessage
}) => {
  return (
    <section>
      <h2>신고 내역 조회</h2>
      {isLoading ? (
        <div css={loader}></div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul css={reportList}>
          {reports.length > 0 ? (
            reports.map((report) => (
              <li key={report.reportId}>
                <p><strong>Report ID:</strong> {report.reportId}</p>
                <p><strong>Member ID:</strong> {report.memberId}</p>
                <p><strong>Detail ID:</strong> {report.detailId}</p>
                <p><strong>Category:</strong> {report.category}</p>
                <p><strong>Content:</strong> {report.content}</p>
                <p><strong>Status:</strong> {report.status}</p>
                <p><strong>Created At:</strong> {report.createdAt}</p>
                <button onClick={() => handleReportAction(report.reportId, "COMPLETE")}>
                  처리
                </button>
                <button onClick={() => handleReportAction(report.reportId, "DENIED")}>
                  거부
                </button>
              </li>
            ))
          ) : (
            <p>신고 내역이 없습니다.</p>
          )}
        </ul>
      )}
      {actionMessage && <p>{actionMessage}</p>}
    </section>
  );
};

export default ReportList;
