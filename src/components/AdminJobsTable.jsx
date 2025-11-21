import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table.jsx';
import { Eye, MoreHorizontal } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter(job =>
      job.title.toLowerCase().includes(searchJobByText.toLowerCase())
    );
    setFilterJobs(filteredJobs);
  }, [searchJobByText, allAdminJobs]);

  return (
    <div className="min-h-[450px]">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="h-14">
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAdminJobs.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-10"
              >
                You haven't registered any job yet.
              </TableCell>
            </TableRow>
          )}

          {allAdminJobs.length > 0 && filterJobs.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-10"
              >
                0 Search Results
              </TableCell>
            </TableRow>
          )}
          {filterJobs?.map(job => (
            <TableRow key={job.id} className="h-16">
              <TableCell className="font-medium">{job.company?.name}</TableCell>

              <TableCell>{job.title}</TableCell>

              <TableCell>{new Date(job.createdAt).toDateString()}</TableCell>

              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>

                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/submission/applicants/${job.id}`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mb-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
