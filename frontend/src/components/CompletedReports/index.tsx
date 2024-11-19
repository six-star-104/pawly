// components/CompletedReports.tsx
import { reportList } from './CompletedReports.styles';
import { ReportType } from '@/types/ReportTypes';

interface CompletedReportsProps {
  completedReports: ReportType[];
}

const CompletedReports: React.FC<CompletedReportsProps> = ({ completedReports }) => (
  <section>
    <h2>처리된 신고 내역</h2>
    <ul css={reportList}>
      {completedReports.length > 0 ? (
        completedReports.map((report) => (
          <li key={report.reportId}>
            <p><strong>Report ID:</strong> {report.reportId}</p>
            <p><strong>Member ID:</strong> {report.memberId}</p>
            <p><strong>Category:</strong> {report.category}</p>
            <p><strong>Content:</strong> {report.content}</p>
            <p><strong>Status:</strong> COMPLETE</p>
          </li>
        ))
      ) : (
        <p>처리된 신고 내역이 없습니다.</p>
      )}
    </ul>
  </section>
);

export default CompletedReports;
