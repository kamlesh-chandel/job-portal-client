import axios from '@/config/axiosConfig';

export const getApplicants = (id) => {
  return axios.get(`/submission/applicants/${id}`);
}

export const updateSubmissionStatus = (submissionId, status) => {
  return axios.put(`/submission/status/${submissionId}`, { status });
};

