import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input.jsx';
import { Button } from '../../components/ui/button.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from '../../components/AdminJobsTable.jsx';
import { setSearchJobByText, setAllAdminJobs } from '../../redux/jobSlice';
import { recruiterJobs } from '@/api/job.api.js';

const LIMIT = 10;
export const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await recruiterJobs(page, LIMIT);

      if (res.data.success) {
        const { items, total, limit } = res.data.data;

        dispatch(setAllAdminJobs(items));

        setTotalPages(Math.ceil(total / limit));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto py-10 min-h-[80vh] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <Input
          onChange={e => setInput(e.target.value)}
          className="w-fit"
          placeholder="Filter by job title"
        />
        <Button onClick={() => navigate('/admin/jobs/create')}>New Job</Button>
      </div>

      <div className="min-h-[450px] transition-all duration-300">
        <AdminJobsTable loading={loading} />
      </div>

      <div className="flex items-center justify-center mt-6 gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span className="border rounded-sm px-4 py-[5px] shadow-xs">
          {page}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
