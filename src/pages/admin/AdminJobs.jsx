import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input.jsx';
import { Button } from '../../components/ui/button.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from '../../components/AdminJobsTable.jsx';
import { setSearchJobByText } from '../../redux/jobSlice';
import { setAllAdminJobs } from '../../redux/jobSlice.js';
import { recruiterJobs } from '@/api/job.api.js';

export const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

 
    const fetchJobs = async () => {
      try {
        const res = await recruiterJobs();
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.data.items));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
 

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex items-center justify-between my-6">
        <Input
          onChange={e => setInput(e.target.value)}
          className="w-fit"
          placeholder="Filter by name"
        />
        <Button onClick={() => navigate('/admin/jobs/create')}>New Job</Button>
      </div>
      <AdminJobsTable />
    </div>
  );
};

