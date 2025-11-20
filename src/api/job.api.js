import axios from '@/config/axiosConfig';

export const recruiterJobs = (page, limit) => {
  const params = {limit, page}
  return axios.get('/jobs/recruiter', {params});
};

export const createJob = data => {
  return axios.post('/jobs', data).then(res => res.data);
};

export const fetchAllJobs = (q = '', page = 1, limit = 10) => {
  const params = { limit, page, q }; 
  return axios.get('/jobs', {params});
};

export const fetchJobDetail = id => {
  return axios.get(`/jobs/${id}`);
};

export const applyJob = job_id => {
  return axios.post(`/application/apply`, { job_id });
};

export const getAppliedJobs = () => {
  return axios.get('/submissions/applied');
};

