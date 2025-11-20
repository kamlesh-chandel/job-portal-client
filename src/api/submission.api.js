import axios from '@/config/axiosConfig';

export const getApplicants = id => {
  return axios.get('/submissions/applicants', { jobId: id });
};

export const updateSubmissionStatus = (submissionId, status) => {
  return axios.put(`/submissions/${submissionId}`, { status });
};

export const checkUserApplied = jobId => {
  return axios.get('/submissions/check', { jobId });
};

export const getAppliedJobs = () => {
  return axios.get('/submissions/applied');
};

export const applyJob = job_id => {
  return axios.post(`/submissions`, { job_id });
};