import axios from '@/config/axiosConfig';

export const recruiterJobs = () => {
  return axios.get('/jobs/recruiter');
};

export const createJob = data => {
  return axios.post('/jobs', data).then(res => res.data);
};
