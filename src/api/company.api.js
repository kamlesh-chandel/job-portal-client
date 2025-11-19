import axios from '@/config/axiosConfig';

export const recruiterCompanies = (page, limit) => {
  return axios.get(`/companies?page=${page}&limit=${limit}`);
};

export const createCompany = form => {
  return axios.post('/companies', form);
};

