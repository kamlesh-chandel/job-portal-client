import axios from '@/config/axiosConfig';

export const recruiterJobs = (page, limit) => {
  return axios.get(`/jobs/recruiter?page=${page}&limit=${limit}`);
};

export const createJob = data => {
  return axios.post('/jobs', data).then(res => res.data);
};

export const fetchAllJobs = (q = '', page = 1, limit = 10) => {
  return axios.get(`/jobs?q=${q}&page=${page}&limit=${limit}`);
};

export const fetchJobDetail = id => {
  return axios.get(`/jobs/${id}`);
};

export const applyJob = job_id => {
  return axios.post(`/submissions`, { job_id });
};

export const getAppliedJobs = () => {
  return axios.get('/submissions');
};

