import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table.jsx';
import { useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover.jsx';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { updateSubmissionStatus } from '@/api/submission.api.js';

const statuses = [
  'pending',
  'under review',
  'interview scheduled',
  'hired',
  'rejected',
];

const ApplicantsTable = () => {
  const { jobSubmissions } = useSelector(store => store.submission);

const handleStatusUpdate = async (newStatus, submissionId) => {
  try {
    const res = await updateSubmissionStatus(submissionId, newStatus);

    if (res.data.success) {
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }
};


  return (
    <div>
      <Table>
        <TableCaption>A list of this Job's Applicants</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobSubmissions.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No Applicant Applied till now
              </TableCell>
            </TableRow>
          ) : (
            jobSubmissions.map(application => (
              <TableRow key={application._id}>
                <TableCell>{application.applicant_id.name}</TableCell>
                <TableCell>{application.applicant_id.email}</TableCell>
                <TableCell>
                  {application.applicant_id.profile.resume_url ? (
                    <a
                      href={application.applicant_id.profile.resume_url}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Open Resume
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(application.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="capitalize font-medium">
                  {application.status || 'pending'}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-40">
                      <div className="flex flex-col gap-2">
                        {statuses.map(s => (
                          <div
                            key={s}
                            onClick={() =>
                              handleStatusUpdate(s, application._id)
                            }
                            className="cursor-pointer capitalize hover:text-blue-500"
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
