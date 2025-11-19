import axios from '@/config/axiosConfig';

export const getApplicants = jobId => {
  return axios.get(`/submissions/applicants`, {
    params: { jobId },
    withCredentials: true,
  });
};



export const updateSubmissionStatus = (submissionId, status) => {
  return axios.patch(`/submissions/${submissionId}`, { status });
};

export const checkUserApplied = jobId => {
  return axios.get(`/submissions/check`, {
    params: { jobId },
  });
};
