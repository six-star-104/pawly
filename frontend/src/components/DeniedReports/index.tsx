import { reportList } from './DeniedReports.styles';
import { ReportType } from '@/types/ReportTypes';

interface DeniedReportsProps {
  deniedReports: ReportType[];
}

const DeniedReports: React.FC<DeniedReportsProps> = ({ deniedReports }) => (
  <section>
    <h2>거부된 신고 내역</h2>
    <ul css={reportList}>
      {deniedReports.length > 0 ? (
        deniedReports.map((report) => (
          <li key={report.reportId}>
            <p><strong>Report ID:</strong> {report.reportId}</p>
            <p><strong>Member ID:</strong> {report.memberId}</p>
            <p><strong>Category:</strong> {report.category}</p>
            <p><strong>Content:</strong> {report.content}</p>
            <p><strong>Status:</strong> DENIED</p>
          </li>
        ))
      ) : (
        <p>거부된 신고 내역이 없습니다.</p>
      )}
    </ul>
  </section>
);

export default DeniedReports;
