import axios from '@/config/axiosConfig';

export const getApplicants = id => {
  return axios.get(`/application/applicants/${id}`);
};

export const updateSubmissionStatus = (submissionId, status) => {
  return axios.put(`/application/status/${submissionId}`, { status });
};

export const checkUserApplied = jobId => {
  return axios.get(`/application/check/${jobId}`);
};