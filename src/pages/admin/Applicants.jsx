import React, { useEffect } from 'react';
import ApplicantsTable from '../../components/ApplicantsTable.jsx';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setJobSubmissions } from '../../redux/submissionSlice.js';
import { getApplicants } from '@/api/submission.api';
export const Applicants = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const fetchApplicants = async () => {
    try {
      const res = await getApplicants(params.job_id);
      if (res.data.success) {
        dispatch(setJobSubmissions(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);
  const { jobSubmissions } = useSelector(store => store.submission);
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-bold text-xl my-5">
        Applicants ({jobSubmissions.length})
      </h1>
      <ApplicantsTable />
    </div>
  );
};
