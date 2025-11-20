import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table.jsx';
import { Badge } from '../components/ui/badge';
import { useSelector } from 'react-redux';

export const AppliedJobTable = () => {
  const { appliedJobs } = useSelector(store => store.job);

  const formatDate = dateString => {
    const d = new Date(dateString);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const renderJobStatus = status => {
    console.log(status)
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-700 border-none">
            Pending
          </Badge>
        );

      case 'under review':
        return (
          <Badge className="bg-blue-500/20 text-blue-700 border-none">
            Under Review
          </Badge>
        );

      case 'interview scheduled':
        return (
          <Badge className="bg-purple-500/20 text-purple-700 border-none">
            Interview Scheduled
          </Badge>
        );

      case 'hired':
        return (
          <Badge className="bg-green-500/20 text-green-700 border-none">
            Hired
          </Badge>
        );

      case 'rejected':
        return (
          <Badge className="bg-red-500/20 text-red-700 border-none">
            Rejected
          </Badge>
        );

      default:
        return (
          <Badge className="bg-gray-300/30 text-gray-700 border-none">
            Unknown
          </Badge>
        );
    }
  };
  return (
    <div className="mb-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            appliedJobs.map((item, idx) => (
              <TableRow key={item._id ?? idx} className="h-16">
                <TableCell>{formatDate(item.created_at)}</TableCell>

                <TableCell>{item.job_id?.title ?? 'N/A'}</TableCell>
                <TableCell>
                  {item.job_id?.company_id?.name ?? 'Unknown'}
                </TableCell>
                <TableCell className="text-right">{renderJobStatus(item.status)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
